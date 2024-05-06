const db = require('../models');
const { Usuario } = require('../models');
const artigoService = require('../services/artigoService');
const {where} = require("sequelize");

// Criar um novo artigo
exports.createArtigo = async (req, res) => {
    try {
        const { titulo, resumo, link, autores } = req.body;

        // Verificar se há autores associados ao artigo
        if (!autores || autores.length === 0) {
            return res.status(400).json({ error: 'É necessário ter pelo menos um autor associado ao artigo.' });
        }

        // Verificar se há mais de 5 autores associados ao artigo
        if (autores.length > 5) {
            return res.status(400).json({ error: 'É permitido no máximo 5 autores por artigo.' });
        }

        // Criar o artigo
        const novoArtigo = await db.Artigo.create({
            titulo,
            resumo,
            link
        });

        // Associar os autores ao artigo
        await novoArtigo.addAutores(autores);

        res.redirect('/home')
    } catch (error) {
        console.error('Erro ao criar artigo:', error);
        res.status(500).json({ error: 'Erro ao criar artigo.' });
    }
};

// Função para lidar com a solicitação GET de artigos
exports.getArtigos = async (req, res) => {
    try {
        const artigos = await artigoService.getAllArtigos();
        res.status(200).json(artigos);
    } catch (error) {
        console.error('Erro ao obter artigos:', error);
        res.status(500).json({error: 'Erro ao obter artigos.'});
    }
};


// Obter um artigo por ID
exports.getArtigoById = async (req, res) => {
    try {
        const {id} = req.params;
        const artigo = await db.Artigo.findByPk(id);
        if (!artigo) {
            res.status(404).json({error: 'Artigo não encontrado.'});
        } else {
            res.status(200).json(artigo);
        }
    } catch (error) {
        console.error('Erro ao obter artigo por ID:', error);
        res.status(500).json({error: 'Erro ao obter artigo por ID.'});
    }
};

// Deletar um artigo por ID
exports.deleteArtigoById = async (req, res) => {
    try {
        const {id} = req.params;
        const artigo = await db.Artigo.findByPk(id);
        if (!artigo) {
            res.status(404).json({error: 'Artigo não encontrado.'});
        } else {
            await artigo.destroy();
            res.status(204).end();
        }
    } catch (error) {
        console.error('Erro ao deletar artigo por ID:', error);
        res.status(500).json({error: 'Erro ao deletar artigo por ID.'});
    }
};
exports.updateArtigo = async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, resumo, link, autoresIds} = req.body;

        // Verifica se o artigo existe
        const artigo = await db.Artigo.findByPk(id);
        if (!artigo) {
            return res.status(404).json({error: 'Artigo não encontrado.'});
        }

        // Verifica se há mais de 5 autores associados ao artigo
        if (autoresIds && autoresIds.length > 5) {
            return res.status(400).json({error: 'É permitido no máximo 5 autores por artigo.'});
        }

        // Atualiza os dados do artigo
        artigo.titulo = titulo;
        artigo.resumo = resumo;
        artigo.link = link;

        // Salva as alterações no artigo
        await artigo.save();

        // Remove todos os autores associados ao artigo
        await artigo.removeAutores();

        // Adiciona os novos autores ao artigo
        await artigo.addAutores(autoresIds);

        // Retorna uma resposta de sucesso
        return res.status(200).json({message: 'Artigo atualizado com sucesso.'});
    } catch (error) {
        console.error('Erro ao atualizar artigo:', error);
        return res.status(500).json({error: 'Erro ao atualizar artigo.'});
    }
};

exports.getArtigoAutores = async (req, res) => {
    try {
        const {id} = req.params;
        const artigo = await db.Artigo.findByPk(id, {include: 'autores'});
        if (!artigo) {
            res.status(404).json({error: 'Artigo não encontrado.'});
        } else {
            res.status(200).json(artigo);
        }
    } catch (error) {
        console.error('Erro ao obter artigo por ID:', error);
        res.status(500).json({error: 'Erro ao obter artigo por ID.'});
    }
};


exports.renderArtigoById = async (req, res) => {
    try {
        const {id} = req.params;
        const artigo = await db.Artigo.findByPk(id, {include: 'autores', include: 'avaliadores'});
        const avaliadoresAll = await Usuario.findAll({
            where: {
                tipo: 'Avaliador'
            }
        });
        if (!artigo) {
            res.status(404).json({error: 'Artigo não renderizado.'});
        } else {
            return res.render('artigo.ejs', {
                user: req.user,
                artigo: artigo,
                avaliadores: avaliadoresAll
            });
        }
    } catch (error) {
        console.error('Erro ao obter artigo por ID:', error);
        res.status(500).json({error: 'Erro ao obter artigo por ID.'});
    }
}

exports.renderArtigoAdd = async (req, res) => {
    try {
        const users = await db.Usuario.findAll({
            where: {
                tipo: 'Autor'
            }
        });
        return res.render('criaArtigo.ejs', {
            user: req.user,
            usuarios: users
        });
    } catch (error) {
        console.error('Erro ao renderizar: ', error);
        res.status(500).json({error: 'Erro ao renderiza: ', error});
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const artigoId = req.params.id; // Obtenha o artigoId dos parâmetros da URL
        const novoStatus = req.body.novoStatus; // Obtenha o novoStatus do corpo da solicitação

        const artigo = await db.Artigo.findByPk(artigoId); // Encontre o artigo pelo ID

        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado' }); // Se o artigo não for encontrado, retorne um status 404
        }

        // Atualize o status do artigo
        await artigo.update({ status: novoStatus });

        res.status(200).json({ message: 'Status do artigo atualizado com sucesso', artigo }); // Se o status for atualizado com sucesso, retorne uma mensagem e o artigo atualizado
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro ao atualizar status', error: error.message }); // Se ocorrer um erro, retorne um status 500 e uma mensagem de erro
    }
};

exports.renderArtigoEdit = async  (req, res) =>{
    try {
        const users = await db.Usuario.findAll({
            where: {
                tipo: 'Autor'
            }
        });
        const artigo = await db.Artigo.findByPk(req.params.id)
        return res.render('editaArtigo.ejs', {
            user: req.user,
            usuarios: users,
            artigo: artigo
        });
    } catch (error) {
        console.error('Erro ao renderizar: ', error);
        res.status(500).json({error: 'Erro ao renderiza: ', error});
    }
}
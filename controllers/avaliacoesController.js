const { Artigo, Usuario } = require('../models');
const db = require("../models");

// Função para associar um usuário avaliador a um artigo
async function associarAvaliadorAoArtigo(req, res) {
    const { avaliador } = req.body;
    const artigoId = req.params.id;
    try {
        // Verificar se o usuário é do tipo 'avaliador'
        const avaliadorOnDb = await Usuario.findOne({
            where: {
                id: avaliador,
                tipo: 'Avaliador'
            }
        });

        if (!avaliadorOnDb) {
            return res.status(404).json({ error: 'Usuário avaliador não encontrado.' });
        }

        // Recuperar o artigo
        const artigo = await Artigo.findByPk(artigoId);

        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado.' });
        }

        // Verificar se o artigo já tem o número máximo de avaliadores
        const numeroAvaliadores = await artigo.countAvaliadores();

        if (numeroAvaliadores >= 3) {
            return res.status(400).json({ error: 'O artigo já tem o número máximo de avaliadores.' });
        }

        // Verificar se o avaliador já está associado ao artigo
        const isAssociated = await artigo.hasAvaliadores(avaliadorOnDb);

        if (isAssociated) {
            return res.status(400).json({ error: 'O avaliador já está associado a este artigo.' });
        }

        // Associar o usuário avaliador ao artigo
        await artigo.addAvaliadores(avaliadorOnDb);

        return res.redirect(`/artigo/${artigoId}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao associar usuário avaliador ao artigo.' });
    }
}

async function getAvaliadores(req, res){
    try {
        const {id} = req.params;
        const artigo = await db.Artigo.findByPk(id, {include: 'avaliadores'});
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

async function updateNota(req, res) {
    try {
        const { n1, n2 } = req.body;
        console.log(n1, n2)
        console.log(req.body)
        // Buscar o artigo no banco de dados
        const artigo = await Artigo.findByPk(req.params.id);
        console.log(artigo)

        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado.' });
        }

        // Verificar se n1 ou n2 no banco são 0
        if (artigo.n1 === 0 || artigo.n2 === 0) {
            // Se n1 ou n2 for 0, salvar n1 e n2 do req.body no banco
            await artigo.update({ n1, n2 });
        } else {
            // Se n1 e n2 já possuem valores no banco, calcular a média
            const novoN1 = (artigo.n1 + n1) / 2;
            const novoN2 = (artigo.n2 + n2) / 2;
            console.log(novoN1, novoN2)
            // Atualizar os valores de n1 e n2 no banco
            await artigo.update({ n1: novoN1, n2: novoN2 });
        }

        return res.status(200).json({ message: 'Notas atualizadas com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar notas do artigo.' });
    }
}



module.exports = {
    associarAvaliadorAoArtigo,
    getAvaliadores,
    updateNota
};

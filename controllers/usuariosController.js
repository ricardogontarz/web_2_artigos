const db = require('../models');

// Controller para lidar com operações relacionadas a usuários


exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, tipo } = req.body;

        // Verifica se o usuário existe no banco de dados
        const user = await db.Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Atualiza os dados do usuário
        await user.update({ nome, email, tipo });

        // Retorna o usuário atualizado
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar todos os usuários.' });
    }
};

exports.renderAdminUsers = async (req, res) => {
    const usuariosAll = await db.Usuario.findAll();
    return res.render('adminUsers.ejs', {
        user: req.user,
        users: usuariosAll
    });
}

exports.renderUsuarioUpdate = async (req, res) =>{
    const usuario = await db.Usuario.findByPk(req.params.id);
    return res.render('editaUser.ejs', {
        user: req.user,
        usuario: usuario
    });
}


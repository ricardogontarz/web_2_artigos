const userController = require('../controllers/usuariosController')
// controllers/authController.js
const authService = require('../services/authService');


exports.getLogin = (req, res) => {
    res.render('login.ejs');
};

exports.postLogin = (req, res) => {
    // A autenticação é tratada pelo Passport.js
};

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.postSignup = async (req, res) => {
    const dados = req.body;
    console.log(dados)
    try {
        await authService.signup(dados)
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.render('signup', { message: 'Erro ao cadastrar usuário' });
    }
};

// Função para fazer logout
exports.logout = (req, res) => {
    // Faz logout do usuário
    req.logout(() => {
        // Redireciona para a página de login após o logout
        res.redirect('/home');
    });
};


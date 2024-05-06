const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/artigoController');
const usuariosController = require('../controllers/usuariosController');
const avaliacaoController = require('../controllers/avaliacoesController')
const homeController = require('../controllers/homeController')
const {isAuthenticated} = require("passport/lib/http/request");
// Middleware para verificar se o usuário está autenticado como administrador
function isAuthenticatedAdmin(req, res, next) {
    console.log('Middleware isAuthenticatedAdmin');
    if (req.isAuthenticated() && req.user && req.user.tipo === 'Administrador') {
        return next();
    }
    console.log('Redirecionando para /auth/login');
    res.redirect('/auth/login');
}

function isAuthenticatedNormal(req, res, next) {
    if (req.isAuthenticated() && req.user) {
        return next();
    }
    console.log('Redirecionando para /auth/login');
    res.redirect('/auth/login');
}

// Middleware para verificar se o usuário está autenticado como administrador ou autor
function isAuthenticatedAutor(req, res, next) {
    console.log('Middleware isAuthenticatedAutor');
    if (req.isAuthenticated() && req.user && (req.user.tipo === 'Administrador' || req.user.tipo === 'Autor')) {
        return next();
    }
    console.log('Redirecionando para /auth/login');
    res.redirect('/auth/login');
}


// Rotas para artigos
router.get('/artigos', artigosController.getArtigos);
router.post('/artigos', artigosController.createArtigo);
router.put('/artigos/:id', artigosController.updateArtigo);
router.delete('/artigos/:id', artigosController.deleteArtigoById);
router.post('/artigos/:id/avaliador', avaliacaoController.associarAvaliadorAoArtigo);
router.patch('/artigos/:id/status', artigosController.updateStatus);
router.get('/artigos/:id/autores', artigosController.getArtigoAutores);
router.get('/artigos/:id/avaliadores', avaliacaoController.getAvaliadores);
router.put('/artigos/:id/nota', avaliacaoController.updateNota);

// Rotas para usuários
router.get('/usuarios', usuariosController.getAllUsers);
router.put('/usuarios/:id', usuariosController.updateUser);
router.delete('/usuarios/:id', usuariosController.deleteUser);

// Rotas para telas
router.get('/', homeController.renderHome);
router.get('/home', homeController.renderHome);
router.get('/artigo/add',isAuthenticatedAutor, artigosController.renderArtigoAdd);
router.get('/artigo/:id/edit', isAuthenticatedAutor, artigosController.renderArtigoEdit)
router.get('/artigo/:id(\\d+)',isAuthenticatedNormal, artigosController.renderArtigoById);
router.get('/admin/users',isAuthenticatedAdmin, usuariosController.renderAdminUsers);
router.get('/admin/users/:id', usuariosController.renderUsuarioUpdate)

module.exports = router;






module.exports = router;

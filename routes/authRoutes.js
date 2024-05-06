// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();


function isAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo === 'Administrador') {
        return next();
    }
    res.redirect('/auth/login');
}

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.logout);

module.exports = router;

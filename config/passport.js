// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const { findByEmail, findById } = require('../services/authService');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async (email, senha, done) => {
        try {
            const user = await findByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado' });
            }
            if (user.senha !== senha) {
                return done(null, false, { message: 'Senha incorreta' });
            }
            console.log(user)
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
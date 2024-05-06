const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const indexRoutes = require('./routes/index');
const flash = require('express-flash');
const db = require('./config/db_sequelize');
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));


// Configuração do Passport
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Inicialização do Passport e persistência da sessão
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/', indexRoutes);

module.exports = app;
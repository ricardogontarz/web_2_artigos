const { Sequelize } = require('sequelize');
const config = require("./config");

const sequelize = new Sequelize({
    database: config.development.database,
    username: config.development.username,
    password: config.development.password,
    host: config.development.host,
    port: config.development.port,
    dialect: 'postgres'
});

const db = {};

// Defina os modelos e associações
db.usuarios = require('../models/usuario')(sequelize, Sequelize);
db.artigos = require('../models/artigo')(sequelize, Sequelize);
db.artigoAutor = require('../models/artigoautor')(sequelize, Sequelize);

// Sincronize os modelos com o banco de dados
const sync = sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
        // Inicie seu servidor ou execute outras operações após a sincronização
    })
    .catch(error => {
        console.error('Erro ao sincronizar modelos com o banco de dados:', error);
    });

module.exports = {
    sequelize: sequelize,
    db: db,
    sync: sync
};

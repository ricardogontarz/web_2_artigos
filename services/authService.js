// services/authService.js
const db = require('../config/db_sequelize').db;

const { Usuarios } = require('../models/usuario'); // Importe o modelo de usuário aqui

exports.findByEmail = async (email) => {
    return db.usuarios.findOne({ where: { email } });
};

exports.findById = async (id) => {
    console.log(id)
    return db.usuarios.findByPk(id);
};

exports.signup = async (dados) => {
    return db.usuarios.create(dados);
};

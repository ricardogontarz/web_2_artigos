// Modelo Usuario
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Associação para artigos em que o usuário é autor
      Usuario.belongsToMany(models.Artigo, {
        through: 'ArtigoAutors',
        foreignKey: 'autorId',
        as: 'artigos'
      });

      // Associação para artigos em que o usuário é avaliador
      Usuario.belongsToMany(models.Artigo, {
        through: 'ArtigoAvaliadors',
        foreignKey: 'avaliadorId',
        as: 'artigos_avaliados',
        scope: {
          tipo: 'avaliador' // Filtra os usuários pelo tipo 'avaliador'
        }
      });
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
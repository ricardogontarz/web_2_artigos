'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artigo extends Model {
    static associate(models) {
      // Associação para autores
      Artigo.belongsToMany(models.Usuario, {
        through: 'ArtigoAutors',
        foreignKey: 'artigoId',
        as: 'autores'
      });

      // Associação para avaliadores
      Artigo.belongsToMany(models.Usuario, {
        through: 'ArtigoAvaliadors',
        foreignKey: 'artigoId',
        as: 'avaliadores',
        scope: {
          tipo: 'Avaliador' // Filtra os usuários pelo tipo 'avaliador'
        }
      });
    }

    // Método para calcular n3
    static calcularN3() {
      return self.n1 * self.n2;
    }
  }

  Artigo.init({
    titulo: DataTypes.STRING,
    resumo: DataTypes.TEXT,
    link: DataTypes.STRING,
    n1: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    n2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Em revisão' // Define um valor padrão para a coluna, se necessário
    }
  }, {
    sequelize,
    modelName: 'Artigo',
  });

  return Artigo;
};

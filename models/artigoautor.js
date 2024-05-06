'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtigoAutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArtigoAutor.belongsTo(models.Artigo, { foreignKey: 'artigoId' });
      ArtigoAutor.belongsTo(models.Usuario, { foreignKey: 'autorId' });
    }
  }
  ArtigoAutor.init({
    artigoId: DataTypes.INTEGER,
    autorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArtigoAutors',
  });
  return ArtigoAutor;
};

// Modelo ArtigoAvaliador
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ArtigoAvaliador extends Model {
        static associate(models) {
            ArtigoAvaliador.belongsTo(models.Artigo, { foreignKey: 'artigoId' });
            ArtigoAvaliador.belongsTo(models.Usuario, { foreignKey: 'avaliadorId' });
        }
    }
    ArtigoAvaliador.init({
        artigoId: DataTypes.INTEGER,
        avaliadorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ArtigoAvaliador', // Correção no nome do modelo
    });
    return ArtigoAvaliador;
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtigoAvaliadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artigoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Artigos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      avaliadorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('ArtigoAvaliadors', ['artigoId', 'avaliadorId'], {
      unique: true,
      name: 'artigo_avaliador_unique_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('ArtigoAvaliadors', 'artigo_avaliador_unique_constraint');
    await queryInterface.dropTable('ArtigoAvaliadors');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Artigos', 'n1', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('Artigos', 'n2', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Artigos', 'n1');
    await queryInterface.removeColumn('Artigos', 'n2');
  }
};

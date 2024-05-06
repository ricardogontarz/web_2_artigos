'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artigos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      resumo: {
        type: Sequelize.TEXT
      },
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
      link: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Em revisão' // Define um valor padrão para a coluna, se necessário
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artigos');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona três usuários
    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Usuário 1',
        email: 'usuario1@example.com',
        tipo: 'Autor',
        login: 'usuario1',
        senha: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Usuário 2',
        email: 'usuario2@example.com',
        tipo: 'Administrador',
        login: 'usuario2',
        senha: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Usuário 3',
        email: 'usuario3@example.com',
        tipo: 'Avaliador',
        login: 'usuario3',
        senha: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    // Remove todos os usuários adicionados pela seed
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};

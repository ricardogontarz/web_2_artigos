'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adicione os dados de exemplo para a tabela de artigos
    return queryInterface.bulkInsert('Artigos', [
      {
        titulo: 'Artigo 1',
        resumo: 'Resumo do Artigo 1...',
        link: 'https://exemplo.com/artigo1',
        status: 'Publicado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Artigo 2',
        resumo: 'Resumo do Artigo 2...',
        link: 'https://exemplo.com/artigo2',
        status: 'Rejeitado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Artigo 3',
        resumo: 'Resumo do Artigo 3...',
        link: 'https://exemplo.com/artigo3',
        status: 'Em revisão',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remova os dados adicionados pela seed da tabela de artigos
    return queryInterface.bulkDelete('Artigos', null, {});
  }
};

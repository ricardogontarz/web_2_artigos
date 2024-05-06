// artigoService.js
const { Artigo } = require('../models'); // Importe o modelo de Artigo

// Função para obter todos os artigos
const getAllArtigos = async () => {
    try {
        const artigos = await Artigo.findAll();
        return artigos;
    } catch (error) {
        console.error('Erro ao obter artigos:', error);
        throw new Error('Erro ao obter artigos.');
    }
};

module.exports = {
    getAllArtigos
};

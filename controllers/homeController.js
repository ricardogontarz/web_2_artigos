const axios = require('axios');

exports.renderHome = async (req, res) => {
    try {
        let artigos;

        // Obter todos os artigos
        const response = await axios.get('http://localhost:8081/artigos');
        artigos = response.data;

        // Para cada artigo, obtenha os autores associados
        for (const artigo of artigos) {
            const autoresResponse = await axios.get(`http://localhost:8081/artigos/${artigo.id}/autores`);
            const avaliadoresResponse = await axios.get(`http://localhost:8081/artigos/${artigo.id}/avaliadores`);
            artigo.autores = autoresResponse.data.autores;
            artigo.avaliadores = avaliadoresResponse.data.avaliadores;

            artigo.n3 = artigo.n1 * artigo.n2;
        }

        // Ordenar os artigos primeiro pelo status "Em revisão" e, em seguida, pela maior n3
        artigos.sort((a, b) => {
            // Se os dois artigos estiverem em revisão, compare n3
            if (a.status === 'Em revisão' && b.status === 'Em revisão') {
                return b.n3 - a.n3; // Ordem decrescente de n3
            } else if (a.status === 'Em revisão') {
                return -1; // "Em revisão" vem antes de qualquer outro status
            } else if (b.status === 'Em revisão') {
                return 1; // "Em revisão" vem antes de qualquer outro status
            } else {
                return b.n3 - a.n3; // Ordem decrescente de n3
            }
        });

        return res.render('home.ejs', {
            usuario: req.user,
            artigos: artigos
        });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        res.status(500).send('Erro ao renderizar a página');
    }
}

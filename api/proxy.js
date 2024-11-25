// api/proxy.js

module.exports = async (req, res) => {
    const axios = require('axios');  // Você pode usar Axios ou o pacote nativo https
  
    try {
      const response = await axios.get('https://www.ans.gov.br/operadoras-entity/v1/operadoras', {
        params: req.query, // Passa os parâmetros da requisição
      });
  
      // Retorna a resposta da API externa para o cliente
      res.status(200).json(response.data);
    } catch (error) {
      // Em caso de erro, retorna o erro para o cliente
      res.status(500).json({ message: 'Erro ao acessar a API externa', error: error.message });
    }
  };
  
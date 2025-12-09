import axios from "axios";

// URL base da sua API
const BASE_URL = "http://rescueus.somee.com/api";

// 1. Cria a instância do Axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


/**
 * Função para buscar os perfis.
 * Faz a requisição e já retorna a lista filtrada (nome e email).
 */
const getPerfisSimples = async () => {
  try {
    // A chamada é feita apenas para o path '/perfis',
    // pois a BASE_URL já está configurada na instância 'api'
    const response = await api.get("/perfis");

    const listaCompleta = response.data;

    // Filtra/Mapeia a lista para retornar APENAS nome e email
    const listaSimples = listaCompleta.map((perfil) => ({
      nome: perfil.nome,
      email: perfil.email,
    }));

    return listaSimples; // Retorna a lista já limpa
  } catch (error) {
    // Re-lança o erro para ser tratado no componente (tela)
    throw error;
  }
};


// Exporta as funções que o componente usará
const apiService = {
  getPerfisSimples,
  // Você pode adicionar outras funções como getHistorico, postLogin, etc.
};

export default apiService;

import News from "../models/News.model.js";

/**
 * Cria uma nova notícia no banco de dados.
 * @param {Object} body - Dados da notícia a serem criados.
 * @returns {Promise<Object>} - Notícia criada.
 */
const createService = (body) => News.create(body);

/**
 * Retorna todas as notícias cadastradas no sistema.
 * @returns {Promise<Array>} - Lista de notícias.
 */
const findAllService = () => News.find();

export { createService, findAllService };

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
const findAllService = (offset, limit) => News.find().sort({ createdAt: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

export { createService, findAllService, countNews };

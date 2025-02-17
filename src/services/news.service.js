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
const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchByTitleService = (title) => News.find({ title: { $regex: title || "", $options: "i" } }).sort({ _id: -1 }).populate("user");

const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");

export { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService };

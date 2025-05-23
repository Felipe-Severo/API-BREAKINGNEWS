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

const updateService = (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true });

const eraseService = (id) => News.findOneAndDelete({ _id: id });

const likeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, createdAt: new Date() } } });

const unlikeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const addCommentService = (idNews, userId, comment) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    return News.findOneAndUpdate(
        { _id: idNews },
        { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } },
        { new: true }
    );
};

const removeCommentService = async (idNews, idComment) => {
    return await News.findOneAndUpdate(
        { _id: idNews },
        { $pull: { comments: { idComment } } },
        { new: true }
    );
};

export {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    unlikeNewsService,
    addCommentService,
    removeCommentService
};

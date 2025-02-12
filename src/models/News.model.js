import mongoose from "mongoose";

/**
 * Schema de Notícias
 * Representa uma notícia no sistema, armazenando informações como título, texto, banner, data de criação,
 * o usuário que publicou, além de curtidas e comentários associados.
 */
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    comments: {
        type: Array,
        required: true
    }
});

const News = mongoose.model('News', NewsSchema);

export default News;

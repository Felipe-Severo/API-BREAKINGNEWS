import mongoose from 'mongoose';
import {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService
} from '../services/news.service.js';

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for create news" });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });

        res.sendStatus(201);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({ message: "Validation error", errors: error.errors });
        }

        res.status(400).send({ message: error.message });
    }
}

/**
 * Recupera uma lista paginada de artigos de notícias.
 * 
 * Esta função lida com parâmetros de consulta opcionais para paginação:
 * - `limit`: O número máximo de artigos a serem retornados (o padrão é 5).
 * - `offset`: O número de artigos a serem ignorados antes de começar a coletar o conjunto de resultados (o padrão é 0).
 * 
 * Retorna uma resposta JSON contendo:
 * - `nextUrl`: URL para a próxima página de resultados, se aplicável.
 * - `previousUrl`: URL para a página anterior de resultados, se aplicável.
 * - `total`: Número total de artigos de notícias.
 * - `limit`: O limite utilizado para a paginação.
 * - `offset`: O deslocamento utilizado para a paginação.
 * - `results`: Um array de artigos de notícias, cada um contendo:
 *   - `id`: O ID do artigo de notícia.
 *   - `title`: O título do artigo de notícia.
 *   - `text`: O conteúdo do artigo de notícia.
 *   - `banner`: A URL da imagem do banner do artigo de notícia.
 *   - `likes`: A lista de curtidas associadas ao artigo de notícia.
 *   - `comments`: A lista de comentários associados ao artigo de notícia.
 *   - `name`: O nome do usuário que criou o artigo de notícia.
 *   - `username`: O nome de usuário de quem criou o artigo de notícia.
 *   - `createdAt`: A data de criação do artigo de notícia.
 * 
 * Se nenhum artigo de notícia for encontrado, retorna um status 400 com uma mensagem apropriada.
 * Em caso de erro, captura e trata erros de validação e conversão, retornando um status 400 com detalhes do erro.
 */
const findAll = async (req, res) => {

    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(limit, offset);
        const total = await countNews()
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news" });
        }

        res.send({
            nextUrl,
            previousUrl,
            total,
            limit,
            offset,

            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                coments: item.comments,
                name: item.user.name,
                username: item.user.username,
                createdAt: item.createdAt
            })
            )
        });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).send({ message: "Cast error", errors: error.errors });
        }

        res.status(400).send({ message: error.message });
    }
}

/**
 * Retorna a notícia mais recente cadastrada no sistema.
 * 
 * Se nenhuma notícia for encontrada, retorna um status 400 com uma mensagem apropriada.
 * Em caso de erro, captura e trata erros de validação e conversão, retornando um status 400 com detalhes do erro.
 */
const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).send({ message: "There are no news" });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                coments: news.comments,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar,
                createdAt: news.createdAt
            }
        })
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

/**
 * Retorna uma notícia pelo seu ID.
 * 
 * Se nenhuma notícia for encontrada, retorna um status 400 com uma mensagem apropriada.
 * Em caso de erro, captura e trata erros de validação e conversão, retornando um status 400 com detalhes do erro.
 * 
 * @param {Object} req - Request Express.
 * @param {Object} res - Response Express.
 * @param {Function} next - Função de callback para o próximo middleware.
 */

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                coments: news.comments,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar,
                createdAt: news.createdAt
            }
        })
        if (!news) {
            return res.status(400).send({ message: "There are no news" });
        }

        req.news = news;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(404).send({ message: "There are no news with this title" });
        }
        
        console.log(news);
        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                avatar: item.user.avatar,
                createdAt: item.createdAt
            }))
        });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

export { create, findAll, topNews, findById, searchByTitle };
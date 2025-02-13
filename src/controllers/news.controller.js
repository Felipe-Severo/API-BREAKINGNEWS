import mongoose from 'mongoose';
import { createService, findAllService, countNews } from '../services/news.service.js';

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
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves a paginated list of news articles.
 * 
 * This function handles optional query parameters for pagination:
 * - `limit`: The maximum number of articles to return (default is 5).
 * - `offset`: The number of articles to skip before starting to collect the result set (default is 0).
 * 
 * It returns a JSON response containing:
 * - `nextUrl`: URL for the next page of results, if applicable.
 * - `previousUrl`: URL for the previous page of results, if applicable.
 * - `total`: Total number of news articles.
 * - `limit`: The limit used for pagination.
 * - `offset`: The offset used for pagination.
 * - `results`: An array of news articles, each containing:
 *   - `id`: The ID of the news article.
 *   - `title`: The title of the news article.
 *   - `text`: The text content of the news article.
 *   - `banner`: The banner image URL of the news article.
 *   - `likes`: The list of likes associated with the news article.
 *   - `comments`: The list of comments associated with the news article.
 *   - `name`: The name of the user who created the news article.
 *   - `username`: The username of the user who created the news article.
 *   - `createdAt`: The creation date of the news article.
 * 
 * If no news articles are found, it returns a 400 status with an appropriate message.
 * In case of an error, it catches and handles validation and cast errors, returning a 400 status with error details.
 */

/******  07072579-7990-4324-b9f0-bfb43dd7ecc7  *******/
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

export { create, findAll };
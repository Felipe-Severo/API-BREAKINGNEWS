import mongoose from 'mongoose';
import { createService, findAllService } from '../services/news.service.js';

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
const findAll = async (req, res) => {
    const news = await findAllService();
    if (news.length === 0) {
        res.status(400).send({ message: "There are no news" });
    }

    res.send(news);
}

export { create, findAll };
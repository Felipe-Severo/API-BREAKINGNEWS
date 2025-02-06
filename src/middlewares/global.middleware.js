import mongoose from 'mongoose';
import userService from '../services/user.service.js';

export const validId = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Id inválido" });
        }

        next();

    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.findByIdService(id);

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        req.user = user;
        req.id = id;

        next();

    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

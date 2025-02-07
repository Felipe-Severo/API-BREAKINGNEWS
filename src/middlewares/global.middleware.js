import mongoose from 'mongoose';
import userService from '../services/user.service.js';
import carService from '../services/car.service.js';

export const validId = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }

        next();

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const validEntity = (service, entityName) => {
    return async (req, res, next) => {
        try {
            const id = req.params.id;
            const entity = await service.findByIdService(id);

            if (!entity) {
                return res.status(404).send({ error: `${entityName} not found` });
            }

            req[entityName.toLowerCase()] = entity;
            req.id = id;

            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
};

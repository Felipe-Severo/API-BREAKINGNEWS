const mongoose = require('mongoose');
const userService = require('../services/user.service');

const validId = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Id inválido" });
    }

    next();
};

const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }

    req.user = user;
    req.id = id;

    next();
};

module.exports = { validId, validUser };
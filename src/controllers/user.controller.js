const userService = require('../services/user.service');
const mongoose = require('mongoose');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ error: "Erro ao criar usuário" });
    }

    res.status(201).send({
        message: "Usuário criado com sucesso",
        user: {
            id: user._id,
            name,
            username,
            email,
            password,
            avatar,
            background,
            date: user.date
        },
    });
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (!users) {
        return res.status(400).send({ error: "Erro ao buscar usuários" });
    }

    res.status(200).send({
        message: "Usuários encontrados com sucesso",
        users
    });
};

const findById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Id inválido" });
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ error: "Erro ao buscar usuário" });
    }

    res.status(200).send({
        message: "Usuário encontrado com sucesso",
        user
    });
};

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    };

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Id inválido" });
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ error: "Erro ao buscar usuário" });
    }

    await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    );

    if (!user) {
        return res.status(400).send({ error: "Erro ao atualizar usuário" });
    }

    res.status(200).send({
        message: "Usuário atualizado com sucesso",
        user
    })
};
module.exports = { create, findAll, findById, update };
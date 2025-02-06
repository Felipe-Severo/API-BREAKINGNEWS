import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        };

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ error: "Erro ao criar usuário" });
        };

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
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (!users) {
            return res.status(400).send({ error: "Erro ao buscar usuários" });
        };

        res.status(200).send({
            message: "Usuários encontrados com sucesso",
            users
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

const findById = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).send({
            message: "Usuário encontrado com sucesso",
            user
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).json({ error: "Preencha algum dos campos de usuário" });
        };

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            user
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

export default {
    create,
    findAll,
    findById,
    update
};
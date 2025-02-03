const userService = require('../services/user.service');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await userService.create(req.body);

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
        }
    });
};

module.exports = { create };
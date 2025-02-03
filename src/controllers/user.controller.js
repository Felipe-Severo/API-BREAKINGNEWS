const create = (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    res.status(201).send({
        message: "Usuário criado com sucesso",
        user: {
            name,
            username,
            email,
            password,
            avatar,
            background
        }
    });
};

module.exports = { create };
import bcrypt from "bcryptjs";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginService(email);

        if (!user) {
            return res.status(401).send({ message: "User or password not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "User or password not found" });
        }

        const token = generateToken(user._id);

        res.status(200).send({ message: "User logged with success", token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export { login };
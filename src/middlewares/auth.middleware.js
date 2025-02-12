import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userSevice from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const parts = authorization.split(' ');
        const [scheme, token] = parts;

        if (parts.length !== 2 || !scheme || !token) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        if (scheme !== 'Bearer') {
            return res.status(401).send({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Token invalid" });
            }

            if (!decoded || !decoded.id) {
                return res.status(401).send({ message: "Unauthorized" });
            }

            const user = await userSevice.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid token" });
            }

            req.userId = user._id;
            next();
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        res.status(400).send({ message: error.message });
    }
}

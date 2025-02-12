import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

/**
 * Busca um usuário pelo e-mail para autenticação.
 * Inclui a senha na consulta para validação do login.
 * @param {String} email - E-mail do usuário.
 * @returns {Promise<Object|null>} - Usuário encontrado ou null se não existir.
 */
const loginService = (email) => User.findOne({ email: email }).select("+password");

/**
 * Gera um token JWT para autenticação do usuário.
 * @param {String} id - ID do usuário autenticado.
 * @returns {String} - Token JWT válido por 24 horas.
 */
const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { loginService, generateToken };

import User from '../models/User.model.js';

/**
 * Cria um novo usuário no banco de dados.
 * @param {Object} body - Dados do usuário a serem criados.
 * @returns {Promise<Object>} - Usuário criado.
 */
const createService = (body) => User.create(body);

/**
 * Retorna todos os usuários cadastrados no sistema.
 * @returns {Promise<Array>} - Lista de usuários.
 */
const findAllService = () => User.find();

/**
 * Busca um usuário pelo ID.
 * @param {String} id - ID do usuário.
 * @returns {Promise<Object|null>} - Usuário encontrado ou null se não existir.
 */
const findByIdService = (id) => User.findById(id);

/**
 * Atualiza os dados de um usuário existente.
 * @param {String} id - ID do usuário a ser atualizado.
 * @param {String} name - Nome do usuário.
 * @param {String} username - Nome de usuário.
 * @param {String} email - E-mail do usuário.
 * @param {String} password - Senha do usuário.
 * @param {String} avatar - URL do avatar.
 * @param {String} background - URL do background.
 * @returns {Promise<Object|null>} - Usuário atualizado ou null se não encontrado.
 */
const updateService = (id, name, username, email, password, avatar, background) =>
    User.findOneAndUpdate(
        { _id: id },
        { name, username, email, password, avatar, background },
        { new: true } // Retorna o documento atualizado
    );

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
};

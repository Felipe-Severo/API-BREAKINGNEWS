import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Schema do Usuário
 * Representa um usuário no sistema, armazenando dados de autenticação e perfil.
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // Exclui a senha por padrão das consultas
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook executado antes de salvar o usuário no banco.
 * Realiza o hash da senha utilizando bcrypt.
 */
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Evita re-hash desnecessário
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;

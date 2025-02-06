import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDatabase = () => {
    console.log('Conectando ao banco de dados...');

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Banco de dados conectado com sucesso!')
    }).catch((err) => {
        console.log(err);
        console.log({
            error: 'Não foi possível conectar ao banco de dados!'
        });
    });
}

export default connectDatabase;
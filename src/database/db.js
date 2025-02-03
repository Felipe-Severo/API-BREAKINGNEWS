const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('Conectando ao banco de dados...');

    mongoose.connect('mongodb+srv://felipisevero:XYUqOP7Ox13xU91O@cluster0.uupqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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

module.exports = connectDatabase;
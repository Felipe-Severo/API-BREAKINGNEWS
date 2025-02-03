const express = require('express');
const app = express();

const userRoute = require('./src/routes/user.route')

const port = 3000;


app.use(express.json());
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})
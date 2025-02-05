const express = require('express');
const app = express();
const connectDatabase = require('./src/database/db');

const userRoute = require('./src/routes/user.route');

const carRoute = require('./src/routes/car.route');

const port = 3000;

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/car', carRoute);

app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});
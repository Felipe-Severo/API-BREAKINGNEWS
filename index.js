import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import carRoute from './src/routes/car.route.js';


const app = express();
const port = 3000;

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/car', carRoute);

app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});
import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';

import userRoute from './src/routes/user.route.js';
import carRoute from './src/routes/car.route.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/car', carRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});
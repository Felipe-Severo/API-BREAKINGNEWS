import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';

import userRoute from './src/routes/user.route.js';
import carRoute from './src/routes/car.route.js';
import authRoute from './src/routes/auth.route.js';
import newsRoute from './src/routes/news.route.js';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/car', carRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);

app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});
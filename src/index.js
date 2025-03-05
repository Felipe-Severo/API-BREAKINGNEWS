import express from 'express';
import connectDatabase from './database/db.js';
import dotenv from 'dotenv';

import userRoute from './routes/user.route.js';
import carRoute from './routes/car.route.js';
import authRoute from './routes/auth.route.js';
import newsRoute from './routes/news.route.js';
import swaggerRoute from './routes/swagger.route.cjs';

dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/car', carRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/docs', swaggerRoute);

app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});
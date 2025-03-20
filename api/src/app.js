import express from 'express';
import router from './routers/routers.js';
import cors from 'cors';

const app = express();
const corsOptions = {
origin: '*',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use('/api', router);

export default app;
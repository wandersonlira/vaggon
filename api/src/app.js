import express from 'express';
import router from './routers/routers.js';
import cors from 'cors';

const app = express();
const corsOptions = {
origin: true,
methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', router);

export default app;
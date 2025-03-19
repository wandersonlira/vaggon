import express from 'express';
import router from './routers/routers.js';
import cors from 'cors';
// import {ORIGIN_DEVELOPMENT, ORIGIN_PRODUCTION} from './app/config/corsConfig.js'

const app = express();
// const desenvolvimento = ORIGIN_DEVELOPMENT
// const producao = ORIGIN_PRODUCTION
// const corsOptions = {
// origin: [desenvolvimento, producao],
// methods: ['GET', 'POST', 'PUT', 'DELETE'],
// allowedHeaders: ['Content-Type', 'Authorization']
// }

// app.use(cors(corsOptions))
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use('/api', router);

export default app;
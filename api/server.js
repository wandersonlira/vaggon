import express from 'express';
import dotenv from 'dotenv';
import app from './src/app.js';
import database from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT;


app.listen(PORT, async () => {
    console.log(`Rodando no endereco http://localhost:${PORT}`);
       await database.sync();
});


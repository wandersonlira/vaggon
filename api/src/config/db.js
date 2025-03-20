import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


// const sequelize = new Sequelize('agenda_eletronica', 'root', 'admin123', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: true
// });

const sequelize = new Sequelize(
    process.env.DEVELOPMENT_DB_DATABASE, 
    process.env.DEVELOPMENT_DB_USER, 
    process.env.DEVELOPMENT_DB_PASSWORD, 
    {
        host: process.env.DEVELOPMENT_DB_HOST,
        dialect: process.env.DEVELOPMENT_DB_DIALECT,
        logging: true
    }
);


export default sequelize;
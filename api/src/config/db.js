import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('agenda_eletronica', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});


export default sequelize;
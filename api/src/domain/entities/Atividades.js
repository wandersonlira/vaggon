import { DataTypes, Model } from "sequelize";
import sequelize from '../../config/db.js';

class Atividades extends Model {

    static async findById(id) {
        return this.findOne({where: {id} });
    }
    
}

Atividades.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHoraInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataHoraFim: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
            defaultValue: 'pendente'
        }

    },

    {
        sequelize,
        modelName: 'Atividades',
        tableName: 'atividades',
      }
);


export default Atividades;
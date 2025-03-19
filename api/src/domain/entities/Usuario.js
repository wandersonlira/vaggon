import { Model, DataTypes } from "sequelize";
import sequelize from '../../config/db.js'
import Atividades from "./Atividades.js";

class Usuario extends Model {

    static async findByLogin(login) {
        return this.findOne({where: {login} });
    }

}


Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
    }

  );

  
  Usuario.hasMany(Atividades, {
    foreignKey: 'usuarioId',
    as: 'atividades'
  });

  export default Usuario;
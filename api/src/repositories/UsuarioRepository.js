// import { where } from "sequelize";
import Atividades from "../domain/entities/Atividades.js";
import Usuario from "../domain/entities/Usuario.js";

class UsuarioRepository {

    constructor() {
        this.usuarioModel = Usuario;
        this.atividadesModel = Atividades
    }

    
    async create({ login, senha }) {
        const usuario = await this.usuarioModel.create({ login, senha }, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findByLogin(login) {
        const usuario = await this.usuarioModel.findByLogin(login, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findById(id) {
        const usuario = await this.usuarioModel.findByPk(id, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findAll() {
        const usuario = await this.usuarioModel.findAll({
            include: {
                model: Atividades,
                as: 'atividades'
            }
        })
        return usuario
    }

    async delete(usuario) {
        await usuario.destroy({ where: {
            id: usuario.id
        }});
    }

}

export default new UsuarioRepository();
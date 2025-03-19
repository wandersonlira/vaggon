import Atividades from "../domain/entities/Atividades.js";
import Usuario from "../domain/entities/Usuario.js";

class UsuarioRepository {

    async create({ login, senha }) {
        const usuario = await Usuario.create({ login, senha }, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findByLogin(login) {
        const usuario = await Usuario.findByLogin(login, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findById(id) {
        const usuario = await Usuario.findByPk(id, {
            include: {
                model: Atividades,
                as: 'atividades'
            }
        });
        return usuario;
    }

    async findAll() {
        const usuario = await Usuario.findAll({
            include: {
                model: Atividades,
                as: 'atividades'
            }
        })
        return usuario
    }

    async delete(id) {
        const usuario = await this.findById(id);
        if (!usuario) {
            throw new Error(`Usuário ID=${id} não encontrado para exclução!`)
        }
        await usuario.destroy()
    }

}

export default new UsuarioRepository();
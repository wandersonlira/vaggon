import UsuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioService {

    constructor() {
        this.service = UsuarioRepository;
    }


    async create({ login, senha }) {
        const usuario = await this.service.create({ login, senha });
        return usuario;
    }

    async findAll() {
        const usuarios = await this.service.findAll();
        return usuarios;
    }

    async findByLogin(login) {
        const usuario = await this.service.findByLogin(login);
        return usuario;
    }

    async findById(id) {
        const usuario = await this.service.findById(id);
        return usuario;
    }

    async delete(id) {
        const usuario = await this.findById(id);
        if (!usuario) {
            throw new Error(`Usuário ID=${id} não encontrado para exclução!`)
        }
        await this.service.delete(usuario);
    }

}

export default new UsuarioService();
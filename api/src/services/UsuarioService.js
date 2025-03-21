import UsuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioService {

    constructor() {
        this.repository = UsuarioRepository;
    }


    async create({ login, senha }) {
        if (!login || !senha) {
            throw new Error('Login e senha são obrigatórios.');
        }
        try {
            const usuarioExiste = await this.repository.findByLogin(login);
            if (usuarioExiste) {
                throw new Error('Login existente!')
            }
            const usuario = await this.repository.create({ login, senha });
            return usuario;
        } catch (error) {
            console.error('Erro ao tentar criar usuário:', error);
            throw new Error(`Falha ao criar usuário: ${error.message || error}`);
        }
    }

    async findAll() {
        try {
            const usuarios = await this.repository.findAll();
            return usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw new Error(`Não foi possível recuperar os usuários: ${error.message || error}`);
        }
    }

    async findByLogin(login) {
        if (!login) {
            throw new Error('O login é obrigatório.');
        }
        try {
            const usuario = await this.repository.findByLogin(login);

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
    
            return usuario;
        } catch (error) {
            console.error('Erro ao buscar usuário pelo login:', error);
            throw new Error(`Erro ao buscar usuário: ${error.message || error}`);
        }
    }

    async authentication({login, senha}) {
        if (!login) {
            throw new Error('O login é obrigatório.');
        }
        try {
            const usuario = await this.repository.authentication(login);

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            if (senha != usuario.senha) {
                throw new Error('Usuário não autorizado!');
            }
    
            return true;
        } catch (error) {
            console.error('Erro ao buscar usuário pelo login:', error);
            throw new Error(`Erro ao buscar usuário: ${error.message || error}`);
        }
    }

    async findById(id) {
        if (!id) {
            throw new Error('O ID é obrigatório.');
        }
    
        try {
            const usuario = await this.repository.findById(id);
            if (!usuario) {
                throw new Error(`Usuário com ID ${id} não encontrado.`);
            }
            return usuario;
        } catch (error) {
            console.error('Erro ao buscar usuário pelo ID:', error);
            throw new Error(`Erro ao buscar usuário: ${error.message || error}`);
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error('O ID é obrigatório para excluir o usuário.');
        }
        try {
            const usuario = await this.findById(id);
            if (!usuario) {
                throw new Error(`Usuário com ID=${id} não encontrado para exclusão.`);
            }
            await this.repository.delete(usuario);
        } catch (error) {
            console.error('Erro ao tentar excluir o usuário:', error);
            throw new Error(`Erro ao excluir o usuário: ${error.message || error}`);
        }
    }

}

export default new UsuarioService();
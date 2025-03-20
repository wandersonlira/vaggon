import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {

    constructor() {
        this.service = UsuarioService;
    }


    async index(req, res) {  
        try {
            const usuarios = await UsuarioService.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
        } 
    }
    

    async show(req, res) {
        const { id } = req.params;
        try {
            const usuario = await UsuarioService.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
        }
    }


    async store(req, res) {
        const { login, senha } = req.body;
        try {
            const novoUsuario = await UsuarioService.create({ login, senha });
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
        }
    }


    async update(req, res) {
        const { id } = req.params;
        const { login, senha } = req.body;
        try {
            const usuario = await UsuarioRepository.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            usuario.login = login || usuario.login;
            usuario.preco = senha || usuario.senha;
    
            await usuario.save();
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
        }
    }


    async delete(req, res) {
        const { id } = req.params;
        try {
            await UsuarioService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'Erro ao excluir usuário', error: error.message });
        }
    }
}


export default new UsuarioController();
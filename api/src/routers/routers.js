import { Router } from "express";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import AtividadeRepository from "../repositories/AtividadeRepository.js";
import UsuarioService from "../services/UsuarioService.js";
import AtividadesService from "../services/AtividadesService.js";


const router = Router();


// --------------------- USUARIO ---------------------


router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await UsuarioService.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});

// Rota GET para buscar um produto específico pelo ID
router.get('/usuarios/:id', async (req, res) => {
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
});

// Rota POST para criar um novo produto
router.post('/usuarios', async (req, res) => {
    const { login, senha } = req.body; // Exemplo de dados que poderiam ser enviados no corpo da requisição
    try {
        const novoUsuario = await UsuarioService.create({ login, senha });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

// Rota PUT para atualizar um produto
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { login, senha } = req.body;
    try {
        const usuario = await UsuarioRepository.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.login = login || usuario.login; // Atualiza o nome se foi enviado
        usuario.preco = senha || usuario.senha; // Atualiza o preço se foi enviado

        await usuario.save();
        res.json(usuario); // Envia o produto atualizado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
});

// Rota DELETE para excluir um produto
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // await UsuarioRepository.delete(id);
        await UsuarioService.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
});


// --------------------- ATIVIDADES ---------------------


router.post('/atividades/:login', async (req, res) => {
    const {login} = req.params;
    const { nome, descricao, dataHoraInicio, dataHoraFim, status } = req.body;
    try {
        const atividade = await AtividadesService.create({nome, descricao, dataHoraInicio, dataHoraFim, status, login});
        res.status(201).json(atividade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});

router.get('/atividades/:login', async (req, res) => {
    const { login } = req.params;
    try {
        const atividades = await AtividadesService.findAll({login})
        res.status(200).json(atividades);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao buscar atividades', error: error.message });
    }
});

router.patch('/atividades/:login/status', async (req, res) => {
    const { login } = req.params;
    const { idAtividade, novoStatus } = req.query;

    try {
        const atividade = await AtividadesService.update({
            login,
            idAtividade,
            novoStatus
        });
        res.status(200).json(atividade);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao atualizar status da atividade!', error: error.message });
    }
});

router.delete('/atividades/:login', async (req, res) => {
    const { login } = req.params;
    const { idAtividade } = req.query;

    try {
        await AtividadeRepository.delete({
            login,
            idAtividade
        });

        res.status(204).send();

    } catch (error) {
        res.status(404).json({ message: 'Erro ao deletar atividade!', error: error.message }); 
    }
});

export default router;
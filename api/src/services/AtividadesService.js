import AtividadeRepository from "../repositories/AtividadeRepository.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

class AtividadesService {

    constructor() {
        this.serviceAtividade = new AtividadeRepository();
        this.serviceUsuario = UsuarioRepository;
    }

    

    async create({ nome, descricao, dataHoraInicio, dataHoraFim, status, login }) {
        try {

            if (!nome || !descricao || !dataHoraInicio || !dataHoraFim || !status || !login) {
                throw new Error('Todos os campos são obrigatórios.');
            }

            const usuario = await this.serviceUsuario.findByLogin(login);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            const atividade = await this.serviceAtividade.create({ 
                nome, descricao, dataHoraInicio, 
                dataHoraFim, status, usuarioId: usuario.id 
                });

            return atividade;
            
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar atividade: ${error.message}`);
        }
    }

    async findAll({ login }) {
        try {
            const usuario = await this.#buscaEValidaLogin(login);
            const atividades = await this.serviceAtividade.findAllByLogin({usuarioId: usuario.id})

            return atividades;

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar atividade: ${error.message}`);        
        }
    }

    async update({ login, idAtividade, novoStatus }) {
        try {
            const usuario = await this.#buscaEValidaLogin(login);
            const atividadeUpdate = await this.serviceAtividade.update({ usuarioId: usuario.id, idAtividade, novoStatus });

            return atividadeUpdate;

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao atualizar a atividade: ${error.message}`);
        }
    }

    async delete({ login, idAtividade }) {
        try {
            const usuario = await this.#buscaEValidaLogin(login);
            await this.serviceAtividade.delete({ usuarioId: usuario.id, idAtividade })

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao deletar a atividade: ${error.message}`);
        }
    }



    async #buscaEValidaLogin( login ) {
        if (!login) {
            throw new Error('O campo login não foi definido.'); 
        }

        const usuario = await this.serviceUsuario.findByLogin(login);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        return usuario;
    }
}

export default new AtividadesService();
import Atividades from "../domain/entities/Atividades.js";
import UsuarioRepository from "./UsuarioRepository.js";

class AtividadeRepository {

    async create({ nome, descricao, dataHoraInicio, dataHoraFim, status, login }) {
        const usuario = await UsuarioRepository.findByLogin(login);
        const atividade = await Atividades.create({ nome, descricao, dataHoraInicio, dataHoraFim, status, usuarioId: usuario.id });
        return atividade;
    }
}

export default new AtividadeRepository();
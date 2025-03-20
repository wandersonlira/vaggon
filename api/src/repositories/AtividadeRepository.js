import { where } from "sequelize";
import Atividades from "../domain/entities/Atividades.js";
import UsuarioRepository from "./UsuarioRepository.js";

class AtividadeRepository {

    static async findUsuarioByLogin( login ) {
        if (!login) {
            throw new Error('O campo login não foi definido.'); 
        }

        const usuario = await UsuarioRepository.findByLogin(login);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        return usuario;
    }


    async create({ nome, descricao, dataHoraInicio, dataHoraFim, status, login }) {
        // const usuario = await UsuarioRepository.findByLogin(login);
        // const atividade = await Atividades.create({ 
        //     nome, descricao, dataHoraInicio, 
        //     dataHoraFim, status, usuarioId: usuario.id 
        //     });
        // return atividade;
        try {

            if (!nome || !descricao || !dataHoraInicio || !dataHoraFim || !status || !login) {
                throw new Error('Todos os campos são obrigatórios.');
            }

            const usuario = await UsuarioRepository.findByLogin(login);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            const atividade = await Atividades.create({ 
                nome, descricao, dataHoraInicio, 
                dataHoraFim, status, usuarioId: usuario.id 
                });

            return atividade;
            
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar atividade: ${error.message}`);
        }
    }

    async findAllByLogin({ login }) {
        try {
            const usuario = await AtividadeRepository.findUsuarioByLogin(login);
            const atividades = await Atividades.findAll({
                where: {
                    usuarioId: usuario.id
                }
            });

            return atividades;

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar atividade: ${error.message}`);        
        }

    }

    async update({ login, idAtividade, novoStatus }) {
        try {
            const usuario = await AtividadeRepository.findUsuarioByLogin(login);
            const atividade = await Atividades.findByPk(idAtividade, {
                where: {
                    usuarioId: usuario.id
                }
            });

            atividade.status = novoStatus;
            await atividade.save();

            return atividade;

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao atualizar a atividade: ${error.message}`);
        }
    }

    async delete({ login, idAtividade }) {
        try {
            const usuario = await AtividadeRepository.findUsuarioByLogin(login);
            const atividade = await Atividades.findByPk(idAtividade, {
                where: {
                    usuarioId: usuario.id
                }
            });

            await atividade.destroy();

            
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao deletar a atividade: ${error.message}`);
        }
    }
}

export default new AtividadeRepository();
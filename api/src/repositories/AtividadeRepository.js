import Atividades from "../domain/entities/Atividades.js";

export default class AtividadeRepository {

    constructor() {
        this.atividadesModel = Atividades;
    }
    


    async create({ nome, descricao, dataHoraInicio, dataHoraFim, status, usuarioId }) {
        try {
            const atividade = await this.atividadesModel.create({ 
                nome, descricao, dataHoraInicio, 
                dataHoraFim, status, usuarioId: usuarioId
                });

            return atividade;
            
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar atividade: ${error.message}`);
        }
    }

    async findAllByLogin({ usuarioId }) {
        try {
            const atividades = await this.atividadesModel.findAll({
                where: {
                    usuarioId: usuarioId
                }
            });

            return atividades;

        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar atividade: ${error.message}`);        
        }

    }

    async update({ usuarioId, idAtividade, novoStatus }) {
        try {
            const atividade = await this.atividadesModel.findByPk(idAtividade, {
                where: {
                    usuarioId: usuarioId
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

    async delete({ usuarioId, idAtividade }) {
        try {
            const atividade = await this.atividadesModel.findByPk(idAtividade, {
                where: {
                    usuarioId: usuarioId
                }
            });

            await atividade.destroy();
 
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao deletar a atividade: ${error.message}`);
        }
    }
}
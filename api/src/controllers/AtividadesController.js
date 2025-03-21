import AtividadesService from "../services/AtividadesService.js";

class AtividadesController {
    

        async index(req, res) {  
            const { login } = req.params;
            try {
                const atividades = await AtividadesService.findAll({login})
                res.status(200).json(atividades);
            } catch (error) {
                res.status(404).json({ message: 'Erro ao buscar atividades', error: error.message });
            }
        }


        async indexAtividade(req, res) {  
            const { login, atividadeId } = req.params;
            try {
                const atividades = await AtividadesService.getAtividadeById(login, atividadeId);
                res.status(200).json(atividades);
            } catch (error) {
                res.status(404).json({ message: 'Erro ao buscar atividades', error: error.message });
            }
        }
    
    
        async store(req, res) {
            const {login} = req.params;
            const { nome, descricao, dataHoraInicio, dataHoraFim, status } = req.body;
            try {
                const atividade = await AtividadesService.create({nome, descricao, dataHoraInicio, dataHoraFim, status, login});
                res.status(201).json(atividade);
            } catch (error) {
                res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
            }
        }
    
    
        async update(req, res) {
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
        }
    
    
        async delete(req, res) {
            const { login } = req.params;
            const { idAtividade } = req.query;

            try {
                await AtividadesService.delete({
                    login,
                    idAtividade
                });

                res.status(204).send();

            } catch (error) {
                res.status(404).json({ message: 'Erro ao deletar atividade!', error: error.message }); 
            }
        }

}

export default new AtividadesController();
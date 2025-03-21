import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import AtividadesController from "../controllers/AtividadesController.js";


const router = Router();


// --------------------- USUARIO ---------------------

router.get('/usuarios', UsuarioController.index);

router.get('/usuarios/:id', UsuarioController.show);

router.post('/usuarios', UsuarioController.store);

router.post('/usuarios/auth', UsuarioController.auth);

router.put('/usuarios/:id', UsuarioController.update);

router.delete('/usuarios/:id', UsuarioController.delete);

// --------------------- ATIVIDADES ---------------------

router.post('/atividades/:login', AtividadesController.store);

router.get('/atividades/:login', AtividadesController.index);

router.get('/atividades/:login/atividade/:atividadeId', AtividadesController.indexAtividade);

router.patch('/atividades/:login/status', AtividadesController.update);

router.delete('/atividades/:login', AtividadesController.delete);



export default router;
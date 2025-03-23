import express from "express";
import FuncionarioController from '../controllers/FuncionarioControllers.js';
import uploadMiddleware  from '../middlewares/uploadMiddleware.js'; // Importando o middleware do upload

const router = express.Router();

//GET todos os funcionários
router.get('/funcionarios', FuncionarioController.getAllFuncionarios);

//GET por ID
router.get('/funcionarios/id/:id', FuncionarioController.getFuncionarioById);

//GET por CPF
router.get('/funcionarios/:inputCPFFunc', FuncionarioController.getFuncionarioByCpf);

//POST novo funcionário - formulário
router.post('/funcionarios', uploadMiddleware.single('inputFoto'), FuncionarioController.createFuncionario);

//PUT atualizar funcionário por ID
router.put('/funcionarios/:id', FuncionarioController.updateFuncionario);

//DELETE funcionário por ID
//router.delete('/funcionarios/:id', FuncionarioController.deleteFuncionario);

//DELETE funcionário por CPF
router.delete('/funcionarios/:inputCPFFunc', FuncionarioController.deleteFuncionario);

//Servidor HTTP - Rotas

//GET renderiza interface/formulário novo funcionário
router.get('/funcionarios-create', FuncionarioController.renderCreateFuncionario);

//GET renderiza interface/visualizar funcionários
router.get('/funcionarios-list', FuncionarioController.renderAllFuncionarios);

export default router;
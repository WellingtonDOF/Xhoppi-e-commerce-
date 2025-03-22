import express from "express";
import ClienteController from '../controllers/ClienteControllers.js';
import { uploadMiddleware } from '../middlewares/middlewares.js';

const router = express.Router();


//GET todos os clientes
router.get('/clientes', ClienteController.getAllClientes);

//GET por ID
router.get('/clientes/id/:id', ClienteController.getClienteById);

//GET por CPF
router.get('/clientes/:cpf', ClienteController.getClienteByCpf);

//POST novo cliente - formulário
router.post('/clientes', uploadMiddleware.single('inputFoto'), ClienteController.createCliente);

//PUT atualizar cliente por ID
router.put('/clientes/:id', ClienteController.updateCliente);

//DELETE cliente por ID
//router.delete('/clientes/:id', ClienteController.deleteCliente);

//DELETE cliente por CPF
router.delete('/clientes/:cpf', ClienteController.deleteCliente);

//Servidor HTTP - Rotas

//GET renderiza interface/formulário novo cliente
router.get('/clientes-create', ClienteController.renderCreateCliente);

//GET renderiza interface/visualizar clientes
router.get('/clientes-list', ClienteController.renderAllClientes);

export default router;
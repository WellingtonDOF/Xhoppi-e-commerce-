import express from "express";
import ProdutoController from '../controllers/ProdutoControllers.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js'; // Importando o middleware do upload

const router = express.Router();

//GET todos os produtos
router.get('/produtos', ProdutoController.getAllProdutos);

//GET por ID
router.get('/produtos/:id', ProdutoController.getProdutoById);

//POST novo produto - formulário
router.post('/produtos', uploadMiddleware.single('inputFoto'), ProdutoController.createProduto);

//PUT atualizar produto por ID
router.put('/produtos/:id', ProdutoController.updateProduto);

//DELETE produto por ID
router.delete('/produtos/:id', ProdutoController.deleteProduto);

//Servidor HTTP - Rotas

//GET renderiza interface/formulário novo produto
router.get('/produtos-create', ProdutoController.renderCreateProduto);

//GET renderiza interface/visualizar produtos
router.get('/produtos-list', ProdutoController.renderAllProdutos);

export default router;
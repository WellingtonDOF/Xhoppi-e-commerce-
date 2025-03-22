import express from "express";
import ProdutoController from '../controllers/ProdutoControllers.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js'; // Importando o middleware do upload

const router = express.Router();


export default router;
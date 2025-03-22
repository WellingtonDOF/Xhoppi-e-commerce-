import express from "express";
import FuncionarioController from '../controllers/FuncionarioControllers.js';
import uploadMiddleware  from '../middlewares/uploadMiddleware.js'; // Importando o middleware do upload



const router = express.Router();


export default router;
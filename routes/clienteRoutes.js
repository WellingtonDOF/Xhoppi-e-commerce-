import express from "express";
import ClienteController from '../controllers/ClienteControllers.js';
import { uploadMiddleware } from '../middlewares/middlewares.js';

const router = express.Router();

router.post('/clientes', uploadMiddleware.single('inputFoto'), ClienteController.createCliente);

export default router;
import express from "express";
import UserController from '../controllers/userController.js';
import { rateLimitMiddleware } from "../middlewares/middlewares.js";

const router = express.Router();

//GET LOGIN
router.get('/', UserController.renderLogin);

//AUTENTICANDO O USER
router.post('/autenticar', rateLimitMiddleware, UserController.autenticarUser);

export default router;
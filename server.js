import express from 'express'
import path from 'path'
import __dirname from './utils/pathUtils.js';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import uploadsDirExists from './utils/createUploadsUtils.js';

import {
    staticMiddleware, 
    urlencodedMiddleware, jsonMiddleware,
    securityMiddleware, compressionMiddlewware,
    rateLimitMiddleware, morganMiddleware,
    uploadMiddleware
} from './middlewares/middlewares.js';


import connectBD from './config/db.js';

//Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

//Chama a função para criar a pasta uploads;
uploadsDirExists();

const app = express();
const port = process.env.PORT;

//Conecta ao banco de dados MongoDB
connectBD();

//Registrando todas as rotas de uma só vez
routes.forEach(route=>app.use(route));

//Motor de template
app.set('views', path.join(__dirname, 'views')); //Definindo a pasta do template EJS
app.set('view engine', 'ejs'); //Definindo o motor de template EJS

//Registrando Middlewares
app.use(staticMiddleware);
app.use(urlencodedMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddlewware);
//app.use(rateLimitMiddleware);
app.use(morganMiddleware);
//app.use(uploadMiddleware); //colocar aqui se for usar em todas as rotas

//As rotas endpoints, já foram registradas (abaixo dos imports dos middlewares)

app.listen(port, () => {
    console.log(`Servidor ativo rodando na porta ${port}`)
});



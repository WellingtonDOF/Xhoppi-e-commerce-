import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Cliente from '../models/Cliente.js';
import Funcionario from '../models/Funcionario.js';


class UserController{
    
    static async autenticarUser(req, res){
        try {

            const {inputCPFLog, inputSenhaLog} = req.body;

            let usuario = await Cliente.findByCpf(inputCPFLog);

            if(!usuario){
                usuario = await Funcionario.findByCpf(inputCPFLog);
            }

            if (!usuario) {
                return res.status(401).json({ mensagem: 'Usuário não encontrado' });
            }

            if (usuario.senha.toLowerCase() !== inputSenhaLog.toLowerCase()) {
                return res.status(401).json({ mensagem: 'Senha inválida' });
            }

            const filePath = (path.join(__dirname, 'views','home.html'));
            res.sendFile(filePath);
        } catch (error) {
            console.error('Erro ao carregar ao logar:', error);
            res.status(500).json({message: 'Erro interno'})
        }
    }

    static async renderLogin(req, res){
        try {
            res.sendFile(path.join(__dirname, 'views', 'login.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default UserController;

import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Cliente from '../models/Cliente.js';



class ClienteController{
    
    static async getAllClientes(req, res){
        try {

            const clientes = await Cliente.findAll();
            res.json(clientes);
            
        } catch (error) {
            console.error('Erro ao carregar os clientes:', error);
            res.status(500).json({message: 'Erro interno ao buscar clientes'})
        }
    }

    static async getClienteById(req, res){
        try {
            const { id } = req.params; //Parâmetros URL
            const clienteExistente = await Cliente.findById(id);

            if(!clienteExistente){
                return res.status(404).json({ message: 'Cliente não encontrado'});
            }
            res.json(clienteExistente); //Retorna o cliente como JSON            
        } catch (error) {
            console.error('Erro ao carregar o cliente:', error);
            res.status(500).json({message: 'Erro interno ao buscar o cliente'})
        }
    }

    static async createCliente(req, res){
        try {
            const { nome, sobrenome, cpf, dataNascimento, telefone, email, senha } = req.body;
            const clienteExistente = await Cliente.findByCpf(cpf);

            if(clienteExistente){
                return res.status(400).json({ message: 'Já existe um usuário com esse cpf'});
            }
            else{
                const fotoPerfil = req.file ? req.file.path : null;

                const newCliente = new Cliente(nome, sobrenome, cpf, dataNascimento, telefone, email, senha, fotoPerfil);
                await newCliente.save();
                res.status(201).json(newCliente);
            }
        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).send('Erro interno');
        }
    }
    
    //Implemente os outros métodos da API RESTful
    static async updateCarro(req, res){}
    static async deleteCarro(req, res){}

    //Implementação dos Renders das Páginas WEB
    static async renderCreateCarro(req, res){
        try {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-carro.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllCarros(req, res){
        try {
            const carros = await Carro.findAll();
            //res.sendFile(path.join(__dirname, 'views', 'visualizar-carros.html'));
            res.render('visualizar-carros', {carros: carros});
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

}

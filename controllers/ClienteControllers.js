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

    static async getClienteByCpf(req, res) {
        try {
            const { cpf } = req.params; // Pega o CPF da URL
            const cliente = await Cliente.findByCpf(cpf);
    
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            res.json(cliente);
        } catch (error) {
            console.error('Erro ao buscar cliente por CPF:', error);
            res.status(500).json({ message: 'Erro interno ao buscar cliente' });
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
            res.status(500).send('Erro interno cadastrar cliente');
        }
    }
    
    //Implemente os outros métodos da API RESTful
    static async updateCliente(req, res) {
        try {
            const { id } = req.params;
            const { nome, sobrenome, cpf, dataNascimento, telefone, email, senha } = req.body;
    
            const clienteExistente = await Cliente.findById(id);
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            // Caso os dados passados exista (nome, sobrenome, cpf...) é atualizado (clienteExistente.nome = nome), caso contrário é mantido o antigo (clienteExistente.nome)
            clienteExistente.nome = nome || clienteExistente.nome;
            clienteExistente.sobrenome = sobrenome || clienteExistente.sobrenome;
            clienteExistente.cpf = cpf || clienteExistente.cpf;
            clienteExistente.dataNascimento = dataNascimento || clienteExistente.dataNascimento;
            clienteExistente.telefone = telefone || clienteExistente.telefone;
            clienteExistente.email = email || clienteExistente.email;
            clienteExistente.senha = senha || clienteExistente.senha;
    
            await clienteExistente.save(); 
            res.json(clienteExistente);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar cliente' });
        }
    }

    static async deleteCliente(req, res) {
        try {
            const { cpf } = req.params;
            const clienteExistente = await Cliente.delete(cpf);
    
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            res.status(204).send(); 
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            res.status(500).json({ message: 'Erro interno ao excluir cliente' });
        }
    }

    //Implementação dos Renders das Páginas WEB
    static async renderCreateCliente(req, res){
        try {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-cliente.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllClientes(req, res){
        try {
            const clientes = await Cliente.findAll();
            res.render('visualizar-cliente', {clientes: clientes});
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default ClienteController;

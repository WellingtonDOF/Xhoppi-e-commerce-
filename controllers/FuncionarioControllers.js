import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Funcionario from '../models/Funcionario.js';

class FuncionarioController {

    static async getAllFuncionarios(req, res) {
        try {
            const funcionarios = await Funcionario.findAll();
            res.json(funcionarios);
        } catch (error) {
            console.error('Erro ao carregar os funcionários:', error);
            res.status(500).json({ message: 'Erro interno ao buscar funcionários' });
        }
    }

    static async getFuncionarioById(req, res) {
        try {
            const { id } = req.params;
            const funcionarioExistente = await Funcionario.findById(id);

            if (!funcionarioExistente) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }

            res.json(funcionarioExistente);
        } catch (error) {
            console.error('Erro ao carregar o funcionário:', error);
            res.status(500).json({ message: 'Erro interno ao buscar o funcionário' });
        }
    }

    static async getFuncionarioByCpf(req, res) {
        try {
            const { inputCPFFunc } = req.params;
            const funcionario = await Funcionario.findByCpf(inputCPFFunc);

            if (!funcionario) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }

            res.json(funcionario);
        } catch (error) {
            console.error('Erro ao buscar funcionário por CPF:', error);
            res.status(500).json({ message: 'Erro interno ao buscar funcionário' });
        }
    }

    static async createFuncionario(req, res) {
        try {
            const { inputNomeFunc, inputSobrenomeFunc, inputCPFFunc, inputDataNascFunc, inputTelefoneFunc, inputCargoFunc, inputSalarioFunc, inputEmailFunc, inputSenha } = req.body;

            const salarioConvertido = parseFloat(inputSalarioFunc.replace(',', '.')); //tratando separador de milhar e trocando , por .

            if (isNaN(salarioConvertido)) {
                return res.status(400).json({ message: 'Salário inválido' });
            }

            const funcionarioExistente = await Funcionario.findByCpf(inputCPFFunc);

            if (funcionarioExistente) {
                return res.status(400).json({ message: 'Já existe um funcionário com esse CPF' });
            }

            const fotoPerfil = req.file ? req.file.path : null;

            const newFuncionario = new Funcionario(inputNomeFunc, inputSobrenomeFunc, inputCPFFunc, inputDataNascFunc, inputTelefoneFunc, inputCargoFunc, salarioConvertido, inputEmailFunc, inputSenha, fotoPerfil);
            await newFuncionario.save();

            res.status(201).json(newFuncionario);
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error);
            res.status(500).send('Erro interno ao cadastrar funcionário');
        }
    }

    static async updateFuncionario(req, res) {
        try {
            const { id } = req.params;
            const { inputNomeFunc, inputSobrenomeFunc, inputDataNascFunc, inputTelefoneFunc, inputCargoFunc, inputSalarioFunc, inputEmailFunc, inputSenha } = req.body;

            const funcionarioExistente = await Funcionario.findById(id);
            if (!funcionarioExistente) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }

            if (req.body.inputCPFFunc && req.body.inputCPFFunc !== funcionarioExistente.cpf) {
                return res.status(400).json({ message: 'CPF não pode ser alterado' });
            }
            
            funcionarioExistente.nome = inputNomeFunc || funcionarioExistente.nome;
            funcionarioExistente.sobrenome = inputSobrenomeFunc || funcionarioExistente.sobrenome;
            funcionarioExistente.dataNascimento = inputDataNascFunc || funcionarioExistente.dataNascimento;
            funcionarioExistente.telefone = inputTelefoneFunc || funcionarioExistente.telefone;
            funcionarioExistente.cargo = inputCargoFunc || funcionarioExistente.cargo;
            funcionarioExistente.salario = inputSalarioFunc ? parseFloat(inputSalarioFunc.replace(',', '.')) : funcionarioExistente.salario; //transforma em float, se existir atribui else mantém 
            funcionarioExistente.email = inputEmailFunc || funcionarioExistente.email;
            funcionarioExistente.senha = inputSenha || funcionarioExistente.senha;

            await funcionarioExistente.save();

            res.json(funcionarioExistente);
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar funcionário' });
        }
    }

    static async deleteFuncionario(req, res) {
        try {
            const { inputCPFFunc } = req.params;
            const funcionarioExistente = await Funcionario.delete(inputCPFFunc);

            if (!funcionarioExistente) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            res.status(500).json({ message: 'Erro interno ao excluir funcionário' });
        }
    }

    // Implementação dos Renders das Páginas WEB
    static async renderCreateFuncionario(req, res) {
        try {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-funcionario.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllFuncionarios(req, res) {
        try {
            const funcionarios = await Funcionario.findAll();
            res.render('visualizar-funcionario.ejs', { funcionarios : funcionarios });
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default FuncionarioController;

import FuncionarioModel from './FuncionarioSchema.js';

class Funcionario {

    constructor(nome, sobrenome, cpf, dataNascimento, telefone, cargo, salario, email, senha, file=null){
        this.nome=nome;
        this.sobrenome=sobrenome;
        this.cpf=cpf;
        this.dataNascimento=dataNascimento;
        this.telefone=telefone;
        this.cargo=cargo;
        this.salario=salario;
        this.email=email;
        this.senha=senha;
        this.file=file;   
    }

    async save(){
        const newFuncionario = new FuncionarioModel({
            nome: this.nome,
            sobrenome: this.sobrenome,
            cpf: this.cpf,
            dataNascimento: this.dataNascimento,
            telefone: this.telefone,
            cargo : this.cargo,
            salario: this.salario,
            email: this.email,
            senha: this.senha,
            foto: this.file, //armazenar caminho do arquivo
        });
        return await newFuncionario.save();
    }

    static async findAll(){
        return await FuncionarioModel.find();
    }

    static async findById(id){
        return await FuncionarioModel.findById(id);
    }

    static async findByCpf(cpf){
        return await FuncionarioModel.findOne({cpf: cpf});
    }
      
    static async delete(cpf){
        return await FuncionarioModel.findOneAndDelete({cpf : cpf});
    }

    /*
    static async delete(id){
        return await FuncionarioModel.findByIdAndDelete(id);
    }*/
}

export default Funcionario;

import ClienteModel from './ClienteSchema.js';

class Cliente {

    constructor(nome, sobrenome, cpf, dataNascimento, telefone, email, senha, file){
        this.nome=nome;
        this.sobrenome=sobrenome;
        this.cpf=cpf;
        this.dataNascimento=dataNascimento;
        this.telefone=telefone;
        this.email=email;
        this.senha=senha;
        this.file=file;   
    }

    async save(){
        const newCliente = new ClienteModel({
            nome: this.nome,
            sobrenome: this.sobrenome,
            cpf: this.cpf,
            dataNascimento: this.dataNascimento,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            foto: this.file, //armazenar caminho do arquivo
            //FAZER O ARQUIVO
        });
        return await newCliente.save();
    }

    static async findAll(){
        return await ClienteModel.find();
    }

    static async findById(id){
        return await ClienteModel.findById(id);
    }

    static async findByCpf(cpf){
        return await ClienteModel.findOne({cpf: cpf});
    }

    static async delete(id){
        return await ClienteModel.findByIdAndDelete(id);
    }

}
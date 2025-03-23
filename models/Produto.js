import ProdutoModel from './ProdutoSchema.js';

class Produto {
    constructor(nome, fabricante, descricao, valor, quantidade, file=null){
        this.nome=nome;
        this.fabricante=fabricante;
        this.descricao=descricao;
        this.valor=valor;
        this.quantidade=quantidade;
        this.file=file;   
    }

    async save(){
        //Esse nome: this.nome, a primeira parte (nome), tem que ser identico ao que está no ProdutoSchema, então da problema
        const newProduto = new ProdutoModel({
            nome: this.nome,
            fabricante: this.fabricante,
            descricao: this.descricao,
            valor: this.valor,
            quantidade: this.quantidade,
            foto: this.file, //armazenar caminho do arquivo
        });
        return await newProduto.save();
    }

    static async findAll(){
        return await ProdutoModel.find();
    }

    static async findById(id){
        return await ProdutoModel.findById(id);
    }
    
    static async delete(id){
        return await ProdutoModel.findByIdAndDelete(id);
    }
}

export default Produto;

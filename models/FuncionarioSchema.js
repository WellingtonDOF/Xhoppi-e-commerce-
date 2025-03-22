import mongoose from 'mongoose';

//Schema do funcionario no MongoDB
const FuncionarioSchema = new mongoose.Schema(
    {
        nome : {type: String, required: true},
        sobrenome : {type: String, required: true},
        cpf : {type: String, required: true, unique: true},
        dataNascimento : {type: Date, required: true},
        telefone : {type: String, required: true},
        cargo : {type: String, required: true},
        salario : {type: Number, required: true},
        email : {type: String, required: true},
        senha : {type: String, required: true},
        foto : {type: String, required: false},    
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);

const FuncionarioModel = mongoose.model('Funcionario', FuncionarioSchema);

export default FuncionarioModel;
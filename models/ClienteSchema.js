import mongoose from 'mongoose';

//Schema do cliente no MongoDB
const ClienteSchema = new mongoose.Schema(
    {
        nome : {type: String, required: true},
        sobrenome : {type: String, required: true},
        cpf : {type: String, required: true, unique: true},
        dataNascimento : {type: Date, required: true},
        telefone : {type: String, required: true},
        email : {type: String, required: true},
        senha : {type: String, required: true},
        foto : {type: String, required: false},        
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);


const ClienteModel = mongoose.model('Cliente', ClienteSchema);

export default ClienteModel;
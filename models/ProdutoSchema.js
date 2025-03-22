import mongoose from 'mongoose';

//Schema do produto no MongoDB
const ProdutoSchema = new mongoose.Schema(
    {
        nome : {type: String, required: true},
        fabricante : {type: String, required: true},
        descricao : {type: String, required: true},
        valor : {type: Number, required: true},
        quantidade : {type: Number, required: true},
        foto : {type: String, required: false},    
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);

const ProdutoModel = mongoose.model('Produto', ProdutoSchema);

export default ProdutoModel;
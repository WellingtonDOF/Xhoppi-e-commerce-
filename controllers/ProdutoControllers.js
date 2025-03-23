import path from 'path';
import __dirname from '../utils/pathUtils.js';
import Produto from '../models/Produto.js';

class ProdutoController{

    static async getAllProdutos(req, res){
        try {

            const produtos = await Produto.findAll();
            res.json(produtos);
            
        } catch (error) {
            console.error('Erro ao carregar os Produtos:', error);
            res.status(500).json({message: 'Erro interno ao buscar Produtos'})
        }
    }

    static async getProdutoById(req, res){
        try {
            const { id } = req.params; //Parâmetros URL
            const produtoExistente = await Produto.findById(id);

            if(!produtoExistente){
                return res.status(404).json({ message: 'Produto não encontrado'});
            }
            res.json(produtoExistente); //Retorna o cliente como JSON            
        } catch (error) {
            console.error('Erro ao carregar o Produto:', error);
            res.status(500).json({message: 'Erro interno ao buscar o Produto'})
        }
    }
    
    static async createProduto(req, res){
        try {
            const { inputNomeProd, inputFabricanteProd, inputDescricaoProd, inputValorProd, inputQtdProd } = req.body;

            const valorProd = parseFloat(inputValorProd.replace(',', '.')); 
            const quantidadeProd = parseInt(inputQtdProd.replace(',', '.')); 

            let fotoPerfilAbsoluto = req.file ? req.file.path : null;

            if (fotoPerfilAbsoluto) {
                const nomeArquivo = path.basename(fotoPerfilAbsoluto); // Pega só o nome do arquivo
                fotoPerfilAbsoluto = `uploads\\${nomeArquivo}`; // Monta o caminho manualmente com '\\'
            }

            //não procura se o produto existe, apenas cadastra

            const newProduto = new Produto(inputNomeProd, inputFabricanteProd, inputDescricaoProd, valorProd, quantidadeProd, fotoPerfilAbsoluto);
            await newProduto.save();
            res.status(201).json(newProduto);
            }
            catch (error) {
                console.error('Erro ao cadastrar Produto', error);
                res.status(500).send('Erro interno cadastrar Produto');
            }
    } 
    
    //Implemente os outros métodos da API RESTful
    static async updateProduto(req, res) {
        try {
            const { id } = req.params;

            const { inputNomeProd, inputFabricanteProd, inputDescricaoProd, inputValorProd, inputQtdProd } = req.body;

            const produtoExistente = await Produto.findById(id);
            if (!produtoExistente) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
    
            produtoExistente.nome = inputNomeProd || produtoExistente.nome;
            produtoExistente.fabricante = inputFabricanteProd || produtoExistente.fabricante;
            produtoExistente.descricao = inputDescricaoProd || produtoExistente.descricao;
            produtoExistente.valor = inputValorProd || produtoExistente.valor;
            produtoExistente.quantidade = inputQtdProd || produtoExistente.quantidade;
        
            await produtoExistente.save(); 
            res.json(produtoExistente);
        } catch (error) {
            console.error('Erro ao atualizar Produto:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar Produto' });
        }
    }

    static async deleteProduto(req, res) {
        try {
            const { id } = req.params;
            const produtoExistente = await Produto.delete(id);
    
            if (!produtoExistente) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
    
            res.status(204).send(); 
        } catch (error) {
            console.error('Erro ao excluir Produto:', error);
            res.status(500).json({ message: 'Erro interno ao excluir Produto' });
        }
    }

    //Implementação dos Renders das Páginas WEB
    static async renderCreateProduto(req, res){
        try {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-produto.html'));
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

    static async renderAllProdutos(req, res){
        try {
            const produtos = await Produto.findAll();
            res.render('visualizar-produto', {produtos: produtos});
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default ProdutoController;

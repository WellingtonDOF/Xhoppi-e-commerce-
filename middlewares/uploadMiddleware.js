import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Define o __dirname em ESM (EcmaScript Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do multer para armazenar imagens
const storageMiddleware = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        // Verificar se a pasta 'uploads' existe, caso contrário, criá-la
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Diretório para armazenar as imagens
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
    }
});

// Filtragem de arquivos para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Permitir o arquivo
    } else {
        cb(new Error('Apenas imagens são permitidas'), false); // Rejeitar arquivo
    }
};

// Criando o middleware de upload
const uploadMiddleware = multer({
    storage: storageMiddleware,
    fileFilter: fileFilter
});

export default uploadMiddleware;

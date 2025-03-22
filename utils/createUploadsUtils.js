import fs from 'fs';
import path from 'path';
import __dirname from './pathUtils.js';

// Função para garantir que a pasta 'uploads' exista
const uploadsDirExists = () => {
    const uploadsDir = path.join(__dirname, 'uploads');

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
        console.log('Pasta "uploads" criada com sucesso!');
    }
};

export default uploadsDirExists;

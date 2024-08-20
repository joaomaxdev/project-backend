// Importa o módulo 'express', que é um framework para construir aplicações web em Node.js
const express = require('express');

// Importa o módulo 'dotenv' para carregar variáveis de ambiente de um arquivo .env para process.env
const dotenv = require('dotenv');

// Importa as rotas definidas no arquivo 'routes.js'
const routes = require('./routes');

// Cria uma instância da aplicação Express
const app = express();

// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();

// Middleware para que o Express possa interpretar requisições com JSON no corpo
app.use(express.json());

// Middleware para registrar as rotas definidas no arquivo 'routes.js'
app.use(routes);

// Exporta a instância da aplicação Express para que possa ser usada em outros arquivos
module.exports = app;

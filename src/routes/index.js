// Importa o módulo 'express' para criar e configurar o roteador principal
const express = require('express');

// Importa as rotas de usuários definidas no arquivo 'userRoutes.js'
const userRoutes = require('./userRoutes');

// Importa as rotas de categorias definidas no arquivo 'categoryRoutes.js'
const categoryRoutes = require('./categoryRoutes');

// Importa as rotas de produtos definidas no arquivo 'productRoutes.js'
const productRoutes = require('./productRoutes');

// Cria uma nova instância do roteador usando o Router do Express
const router = express.Router();

// Define a rota para os usuários. Todas as rotas definidas em 'userRoutes' serão prefixadas com '/v1'
// Exemplo: '/v1/users'
router.use('/v1', userRoutes);

// Define a rota para as categorias. Todas as rotas definidas em 'categoryRoutes' serão prefixadas com '/v1'
// Exemplo: '/v1/categories'
router.use('/v1', categoryRoutes);

// Define a rota para os produtos. Todas as rotas definidas em 'productRoutes' serão prefixadas com '/v1'
// Exemplo: '/v1/products'
router.use('/v1', productRoutes);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;

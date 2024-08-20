// Importa o módulo 'express' para criar o roteador
const express = require('express');

// Cria uma nova instância do roteador usando o Router do Express
const router = express.Router();

// Importa as funções de controle de produtos do arquivo 'productController.js'
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Define uma rota GET para buscar produtos.
// Chama a função 'getProducts' do controlador quando a rota '/product/search' é acessada
router.get('/product/search', getProducts);

// Define uma rota GET para obter um produto específico pelo ID.
// Chama a função 'getProductById' do controlador quando a rota '/product/:id' é acessada
router.get('/product/:id', getProductById);

// Define uma rota POST para criar um novo produto.
// Chama a função 'createProduct' do controlador quando a rota '/product' é acessada
router.post('/product', createProduct);

// Define uma rota PUT para atualizar um produto existente pelo ID.
// Chama a função 'updateProduct' do controlador quando a rota '/product/:id' é acessada
router.put('/product/:id', updateProduct);

// Define uma rota DELETE para excluir um produto pelo ID.
// Chama a função 'deleteProduct' do controlador quando a rota '/product/:id' é acessada
router.delete('/product/:id', deleteProduct);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;

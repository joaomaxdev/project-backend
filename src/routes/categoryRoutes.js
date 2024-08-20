// Importa o módulo 'express' para criar roteadores
const express = require('express');

// Cria uma nova instância do roteador usando o Router do Express
const router = express.Router();

// Importa os controladores de categoria, que contêm as funções de manipulação de dados para cada rota
const { 
  searchCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');

// Define uma rota GET para pesquisar categorias. 
// Chama a função 'searchCategories' do controlador quando a rota '/category/search' é acessada
router.get('/category/search', searchCategories);

// Define uma rota GET para obter uma categoria pelo ID. 
// Chama a função 'getCategoryById' do controlador quando a rota '/category/:id' é acessada
router.get('/category/:id', getCategoryById);

// Define uma rota POST para criar uma nova categoria. 
// Chama a função 'createCategory' do controlador quando a rota '/category' é acessada
router.post('/category', createCategory);

// Define uma rota PUT para atualizar uma categoria existente pelo ID. 
// Chama a função 'updateCategory' do controlador quando a rota '/category/:id' é acessada
router.put('/category/:id', updateCategory);

// Define uma rota DELETE para excluir uma categoria pelo ID. 
// Chama a função 'deleteCategory' do controlador quando a rota '/category/:id' é acessada
router.delete('/category/:id', deleteCategory);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;

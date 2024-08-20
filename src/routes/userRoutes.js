// Importa o módulo 'express' para criar o roteador
const express = require('express');

// Cria uma nova instância do roteador usando o Router do Express
const router = express.Router();

// Importa as funções de controle de usuários do arquivo 'userController.js'
const { 
  authenticateUser, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');

// Importa o middleware para autenticação de tokens do arquivo 'authMiddleware.js'
const authenticateToken = require('../middleware/authMiddleware');

// Define uma rota POST para autenticar o usuário e gerar um token.
// Chama a função 'authenticateUser' do controlador quando a rota '/auth/login' é acessada
router.post('/auth/login', authenticateUser);

// Define uma rota GET para obter um usuário específico pelo ID.
// A função 'getUserById' do controlador é chamada quando a rota '/user/:id' é acessada
// O middleware 'authenticateToken' é aplicado para garantir que o usuário esteja autenticado
router.get('/user/:id', authenticateToken, getUserById);

// Define uma rota POST para criar um novo usuário.
// Chama a função 'createUser' do controlador quando a rota '/user' é acessada
router.post('/user', createUser);

// Define uma rota PUT para atualizar um usuário existente pelo ID.
// A função 'updateUser' do controlador é chamada quando a rota '/user/:id' é acessada
// O middleware 'authenticateToken' é aplicado para garantir que o usuário esteja autenticado
router.put('/user/:id', authenticateToken, updateUser);

// Define uma rota DELETE para excluir um usuário pelo ID.
// A função 'deleteUser' do controlador é chamada quando a rota '/user/:id' é acessada
// O middleware 'authenticateToken' é aplicado para garantir que o usuário esteja autenticado
router.delete('/user/:id', authenticateToken, deleteUser);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;

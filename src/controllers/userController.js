// Importa o módulo 'bcrypt' para manipulação de senhas criptografadas
const bcrypt = require('bcrypt');
// Importa o módulo 'jsonwebtoken' para criação e verificação de tokens JWT
const jwt = require('jsonwebtoken');
// Importa o modelo 'User' para interações com a tabela de usuários
const { User } = require('../models');

// Controlador para obter um usuário pelo ID
const getUserById = async (req, res) => {
  try {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;
    // Busca o usuário no banco de dados pelo ID
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstname', 'surname', 'email'],
    });

    // Se o usuário não for encontrado, retorna um erro 404 (Não encontrado)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retorna o usuário encontrado com status 200
    res.status(200).json(user);
  } catch (error) {
    // Registra o erro e retorna um erro 500 (Erro interno do servidor)
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para criar um novo usuário
const createUser = async (req, res) => {
  try {
    // Extrai dados do corpo da requisição
    const { firstname, surname, email, password, confirmPassword } = req.body;

    // Verifica se o corpo da requisição é um objeto válido
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // Verifica se todos os campos obrigatórios estão presentes
    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verifica se a senha e a confirmação da senha coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password do not match' });
    }

    // Verifica se o e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Cria um novo usuário no banco de dados
    const newUser = await User.create({
      firstname,
      surname,
      email,
      password,
    });
    // console.log('New user created:', newUser); // (Comentado) Registro do novo usuário
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // (Comentado) Registro da chave secreta JWT

    // Gera um token JWT para o novo usuário
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna os dados do usuário e o token com status 201 (Criado)
    res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      email: newUser.email,
      token, // Retorna o token JWT
    });
  } catch (error) {
    // Registra o erro e retorna um erro 500 (Erro interno do servidor)
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para autenticar um usuário e gerar um token
const authenticateUser = async (req, res) => {
  try {
    // Extrai o e-mail e a senha do corpo da requisição
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }
    // console.log('Password provided:', password); // (Comentado) Registro da senha fornecida
    // console.log('Hashed password from DB:', user.password); // (Comentado) Registro da senha criptografada do banco de dados

    // Verifica se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    // console.log('Password is valid:', isPasswordValid); // (Comentado) Registro da validade da senha
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token com status 200 (OK)
    res.status(200).json({ token });
  } catch (error) {
    // Registra o erro e retorna um erro 500 (Erro interno do servidor)
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para atualizar um usuário existente
const updateUser = async (req, res) => {
  try {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;
    // Extrai dados do corpo da requisição
    const { firstname, surname, email } = req.body;

    // Verifica se o ID do usuário no token é o mesmo que o ID nos parâmetros
    if (req.user.id !== parseInt(id, 10)) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    // Verifica se todos os campos obrigatórios estão presentes
    if (!firstname || !surname || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verifica se o usuário existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Atualiza os dados do usuário no banco de dados
    await User.update(
      { firstname, surname, email },
      { where: { id } }
    );

    // Retorna status 204 (Sem conteúdo) após a atualização
    res.status(204).send();
  } catch (error) {
    // Registra o erro e retorna um erro 500 (Erro interno do servidor)
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controlador para deletar um usuário
const deleteUser = async (req, res) => {
  try {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;

    // Verifica se o usuário existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove o usuário do banco de dados
    await User.destroy({ 
      where: { id } 
    });

    // Retorna status 204 (Sem conteúdo) após a exclusão
    res.status(204).send();
  } catch (error) {
    // Registra o erro e retorna um erro 500 (Erro interno do servidor)
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Exporta os controladores para uso em outras partes da aplicação
module.exports = {
  getUserById,
  createUser,
  authenticateUser,
  updateUser,
  deleteUser,
};

// Importa o módulo 'jsonwebtoken' para criar e verificar tokens JWT
const jwt = require('jsonwebtoken');

// Middleware para autenticar tokens JWT
const authenticateToken = (req, res, next) => {
  // Obtém o cabeçalho de autorização da requisição
  const authHeader = req.headers['authorization'];
  // Extrai o token do cabeçalho de autorização (assume o formato 'Bearer TOKEN')
  const token = authHeader && authHeader.split(' ')[1];

  // Se o token não estiver presente, retorna um erro 401 (Não autorizado)
  if (!token) return res.status(401).json({ message: 'Token is required' });

  // Verifica o token usando a chave secreta definida no ambiente
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Se ocorrer um erro na verificação do token, registra o erro e retorna um erro 401
    if (err) {
      console.error('JWT Verification Error:', err); // Log do erro de verificação
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Se a verificação for bem-sucedida, adiciona o usuário ao objeto da requisição
    req.user = user;
    // Chama o próximo middleware na cadeia de processamento
    next();
  });
};

// Exporta o middleware para ser utilizado em outras partes da aplicação
module.exports = authenticateToken;

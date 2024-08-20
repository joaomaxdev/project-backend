// Importa a instância da aplicação Express a partir do arquivo 'app.js'
const app = require('./app'); // Ajuste o caminho se necessário
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Ajuste para acessar o swagger.json na raiz

// Define a porta na qual o servidor irá rodar
const PORT = process.env.PORT || 3000;

// Serve a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia o servidor e faz com que ele comece a escutar na porta definida
app.listen(PORT, () => {
  // Exibe uma mensagem no console quando o servidor estiver rodando
  console.log(`Server is running on port ${PORT}`);
});
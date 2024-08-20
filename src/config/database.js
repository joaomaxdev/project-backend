// Importa o módulo Sequelize para interagir com o banco de dados
const { Sequelize } = require('sequelize');

// Importa o módulo dotenv para carregar variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // Opcional: você pode definir outras opções aqui
    // logging: false // Se você quiser desativar o log de SQL
  }
);

// Exporta a instância do Sequelize para ser utilizada em outros módulos da aplicação
module.exports = sequelize;

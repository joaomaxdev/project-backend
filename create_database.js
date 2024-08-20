// Importa os módulos necessários
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Função assíncrona para criar o banco de dados
async function createDatabase() {
  try {
    // Conecta ao servidor MySQL usando as variáveis de ambiente
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Cria o banco de dados se ele não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);

    console.log(`Banco de dados '${process.env.DB_NAME}' criado com sucesso ou já existente.`);

    // Fecha a conexão
    await connection.end();
  } catch (error) {
    // Exibe o erro no console, caso ocorra
    console.error('Erro ao criar o banco de dados:', error);
    process.exit(1);
  }
}

// Executa a função para criar o banco de dados
createDatabase();

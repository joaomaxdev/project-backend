// Importando as bibliotecas necessárias
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carregando as variáveis de ambiente do arquivo .env
dotenv.config();

// Conexão ao banco de dados
async function createDatabases() {
  // Cria uma conexão com o banco de dados MySQL usando as credenciais do .env
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // Criação dos bancos de dados
    await connection.query('CREATE DATABASE IF NOT EXISTS project_root;');
    console.log('Database project_root created successfully.');

    await connection.query('CREATE DATABASE IF NOT EXISTS project_root_test;');
    console.log('Database project_root_test created successfully.');

    await connection.query('CREATE DATABASE IF NOT EXISTS project_root_production;');
    console.log('Database project_root_production created successfully.');
  } catch (err) {
    console.error('Error creating databases:', err.message);
  } finally {
    // Fechando a conexão com o banco de dados
    await connection.end();
  }
}

// Executando a função para criar os bancos de dados
createDatabases();

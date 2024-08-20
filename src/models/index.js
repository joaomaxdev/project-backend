'use strict';

// Importa módulos necessários
const fs = require('fs');               // Módulo para manipulação de sistema de arquivos
const path = require('path');           // Módulo para manipulação de caminhos de arquivos
const Sequelize = require('sequelize'); // Importa Sequelize para ORM
const process = require('process');     // Módulo para manipulação de processos

// Obtém o nome do arquivo atual (index.js)
const basename = path.basename(__filename);

// Define o ambiente atual (development por padrão)
const env = process.env.NODE_ENV || 'development';

// Caminho para o arquivo de configuração
const configPath = path.resolve(__dirname, '../../config/config.json');

// Carrega as configurações do ambiente atual do arquivo de configuração
const config = require(configPath)[env];

// Cria um objeto para armazenar os modelos
const db = {};

// Inicializa a instância do Sequelize
let sequelize;
try {
  if (config.use_env_variable) {
    // Se a configuração usar uma variável de ambiente para a URL de conexão
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    // Caso contrário, usa as configurações diretamente
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  // Lê todos os arquivos no diretório atual, exceto este arquivo e arquivos de teste
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        !file.startsWith('.') &&          // Exclui arquivos ocultos
        file !== basename &&                // Exclui o próprio arquivo index.js
        file.endsWith('.js') &&         // Inclui apenas arquivos JavaScript
        file.indexOf('.test.js') === -1     // Exclui arquivos de teste
      );
    })
    .forEach(file => {
      // Carrega cada modelo e adiciona ao objeto db
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  // Configura associações entre os modelos, se existir um método 'associate'
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Adiciona Sequelize e Sequelize (construtor) ao objeto db para fácil acesso
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

} catch (error) {
  // Captura e exibe erros relacionados à conexão com o banco de dados
  console.error('Unable to connect to the database:', error);
}

// Exporta o objeto db que contém todos os modelos e a instância do Sequelize
module.exports = db;
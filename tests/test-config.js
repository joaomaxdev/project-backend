// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');

// Resolve o caminho absoluto para o arquivo de configuração 'config.json'
// __dirname representa o diretório onde o script atual está localizado
// '../config/config.json' é o caminho relativo para o arquivo de configuração
const configPath = path.resolve(__dirname, '../config/config.json');

// Importa o conteúdo do arquivo de configuração 'config.json' utilizando o caminho resolvido
const config = require(configPath);

// Imprime o conteúdo do arquivo de configuração no console
console.log(config);

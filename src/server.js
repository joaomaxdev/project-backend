// Importa a instância da aplicação Express a partir do arquivo 'app.js'
const app = require('./app');

// Define a porta na qual o servidor irá rodar. Ele usa a variável de ambiente PORT, se disponível, 
// ou o valor padrão 3000, caso contrário.
const PORT = process.env.PORT || 3000;

// Inicia o servidor e faz com que ele comece a escutar na porta definida
app.listen(PORT, () => {
  // Exibe uma mensagem no console quando o servidor estiver rodando
  console.log(`Server is running on port ${PORT}`);
});

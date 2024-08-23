// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');
// Importa 'bcrypt' para hashing de senhas
const bcrypt = require('bcrypt');

// Define e exporta o modelo 'User'
module.exports = (sequelize) => {
  // Define a classe 'User', que herda de Model do Sequelize
  class User extends Model {
    // Método estático para definir associações entre modelos
    static associate(models) {
      // Associações podem ser definidas aqui se necessário
    }
  }

  // Inicializa o modelo 'User' com suas propriedades e configurações
  User.init(
    {
      // Define a propriedade 'id' como INTEGER, chave primária e auto-incrementada
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define a propriedade 'firstname' como STRING e não permite valores nulos
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define a propriedade 'surname' como STRING e não permite valores nulos
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define a propriedade 'email' como STRING, não permite valores nulos e deve ser único
      // Adiciona validação para garantir que o valor é um email válido
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida se o valor é um email válido
        },
      },
      // Define a propriedade 'password' como STRING e não permite valores nulos
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,             // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'User',    // Nome do modelo
      tableName: 'Users',   // Nome da tabela no banco de dados
      timestamps: true,     // Adiciona colunas de timestamps (createdAt e updatedAt)
      hooks: {
        // Hook executado antes da criação de um novo usuário
        beforeCreate: async (user) => {
          if (user.password) {
            // Gera um salt para o hash da senha
            const salt = await bcrypt.genSalt(10);
            // Hash a senha usando o salt
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  // Retorna o modelo 'User' para que possa ser usado em outras partes da aplicação
  return User;
}

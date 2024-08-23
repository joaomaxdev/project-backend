// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');

// Define e exporta o modelo 'ProductOption'
module.exports = (sequelize) => {
  // Define a classe 'ProductOption', que herda de Model do Sequelize
  class ProductOption extends Model {
    // Método estático para definir associações entre modelos
    static associate(models) {
      // Define a associação com o modelo 'Product'
      // Cada 'ProductOption' pertence a um 'Product'
      ProductOption.belongsTo(models.Product, {
        foreignKey: 'product_id', // Chave estrangeira que referencia o modelo 'Product'
        // as: 'product',         // Nome do alias para a associação (comentado aqui, mas pode ser usado se necessário)
      });
    }
  }

  // Inicializa o modelo 'ProductOption' com suas propriedades e configurações
  ProductOption.init(
    {
      // Define a propriedade 'id' como INTEGER, chave primária e auto-incrementada
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define a propriedade 'product_id' como INTEGER, não permite valores nulos
      // Referencia a tabela 'products' e a chave 'id' como chave estrangeira
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Nome do modelo referenciado
          key: 'id',         // Nome da chave referenciada
        },
      },
      // Define a propriedade 'title' como STRING e não permite valores nulos
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define a propriedade 'shape' como ENUM com valores 'square' ou 'circle', valor padrão é 'square'
      shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square',
      },
      // Define a propriedade 'radius' como STRING, valor padrão é 0
      radius: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      // Define a propriedade 'type' como ENUM com valores 'text' ou 'color', valor padrão é 'text'
      type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text',
      },
      // Define a propriedade 'values' como STRING e não permite valores nulos
      values: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,              // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'ProductOption', // Nome do modelo
      tableName: 'ProductOption', // Nome da tabela no banco de dados
      timestamps: true,     // Adiciona colunas de timestamps (createdAt e updatedAt)
    }
  );

  // Retorna o modelo 'ProductOption' para que possa ser usado em outras partes da aplicação
  return ProductOption;
}

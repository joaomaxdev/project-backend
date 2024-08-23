// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');

// Define e exporta o modelo 'ProductImage'
module.exports = (sequelize) => {
  // Define a classe 'ProductImage', que herda de Model do Sequelize
  class ProductImage extends Model {
    // Método estático para definir associações entre modelos
    static associate(models) {
      // Define a associação com o modelo 'Product'
      // Cada 'ProductImage' pertence a um 'Product'
      ProductImage.belongsTo(models.Product, {
        foreignKey: 'product_id', // Chave estrangeira que referencia o modelo 'Product'
        // as: 'product',          // Nome do alias para a associação (comentado aqui, mas pode ser usado se necessário)
      });
    }
  }

  // Inicializa o modelo 'ProductImage' com suas propriedades e configurações
  ProductImage.init(
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
      // Define a propriedade 'enabled' como BOOLEAN com valor padrão falso
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Define a propriedade 'path' como STRING e não permite valores nulos
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,              // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'ProductImage', // Nome do modelo
      tableName: 'ProductImage', // Nome da tabela no banco de dados
      timestamps: true,     // Adiciona colunas de timestamps (createdAt e updatedAt)
    }
  );

  // Retorna o modelo 'ProductImage' para que possa ser usado em outras partes da aplicação
  return ProductImage;
}

// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');

// Define e exporta o modelo 'ProductCategory'
module.exports = (sequelize) => {
  // Define a classe 'ProductCategory', que herda de Model do Sequelize
  class ProductCategory extends Model {
    // Método estático para definir associações entre modelos
    static associate(models) {
      // Associações podem ser definidas aqui, se necessário
    }
  }

  // Inicializa o modelo 'ProductCategory' com suas propriedades e configurações
  ProductCategory.init(
    {
      // Define a propriedade 'product_id' como INTEGER, não permite valores nulos
      // Referencia a tabela 'products' e a chave 'id' como chave estrangeira
      // Quando o produto é excluído, a associação é excluída também
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Nome do modelo referenciado
          key: 'id',         // Nome da chave referenciada
        },
        onDelete: 'CASCADE', // Define a ação a ser tomada em caso de exclusão (CASCADE)
      },
      // Define a propriedade 'category_id' como INTEGER, não permite valores nulos
      // Referencia a tabela 'categories' e a chave 'id' como chave estrangeira
      // Quando a categoria é excluída, a associação é excluída também
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories', // Nome do modelo referenciado
          key: 'id',           // Nome da chave referenciada
        },
        onDelete: 'CASCADE', // Define a ação a ser tomada em caso de exclusão (CASCADE)
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,              // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'ProductCategory', // Nome do modelo
      tableName: 'product_categories', // Nome da tabela no banco de dados
      timestamps: false,     // Não adiciona colunas de timestamps (createdAt e updatedAt)
    }
  );

  // Retorna o modelo 'ProductCategory' para que possa ser usado em outras partes da aplicação
  return ProductCategory;
}

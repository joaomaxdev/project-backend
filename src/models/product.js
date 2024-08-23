// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');

// Define e exporta o modelo 'Product'
module.exports = (sequelize) => {
  // Define a classe 'Product', que herda de Model do Sequelize
  class Product extends Model {
    
    // Método estático para definir associações entre modelos
    static associate(models) {
      // Associação com o modelo 'Category'
      // Comentado aqui, mas pode ser usado se necessário
      // Product.belongsTo(models.Category, {
      //   foreignKey: 'category_id', // Chave estrangeira que referencia o modelo 'Category'
      //   as: 'category', // Nome do alias para a associação
      // });

      // Associação de muitos-para-muitos com o modelo 'Category'
      // Um produto pode pertencer a muitas categorias
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory, // Tabela de junção que define a relação
        foreignKey: 'product_id', // Chave estrangeira que referencia o modelo 'Product'
        as: 'categories', // Nome do alias para a associação
      });

      // Associação de um-para-muitos com o modelo 'ProductOption'
      // Um produto pode ter muitas opções
      Product.hasMany(models.ProductOption, {
        foreignKey: 'product_id', // Chave estrangeira que referencia o modelo 'Product'
        as: 'options', // Nome do alias para a associação
      });

      // Associação de um-para-muitos com o modelo 'ProductImage'
      // Um produto pode ter muitas imagens
      Product.hasMany(models.ProductImage, {
        foreignKey: 'product_id', // Chave estrangeira que referencia o modelo 'Product'
        as: 'images', // Nome do alias para a associação
      });
    }
  }

  // Inicializa o modelo 'Product' com suas propriedades e configurações
  Product.init(
    {
      // Define a propriedade 'id' como INTEGER, chave primária e auto-incrementada
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define a propriedade 'enabled' como BOOLEAN, valor padrão é false
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Define a propriedade 'name' como STRING e não permite valores nulos
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define a propriedade 'slug' como STRING, não permite valores nulos e deve ser única
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Define a propriedade 'use_in_menu' como BOOLEAN, valor padrão é false
      use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Define a propriedade 'stock' como INTEGER, valor padrão é 0
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // Define a propriedade 'description' como STRING e não permite valores nulos
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define a propriedade 'price' como FLOAT e não permite valores nulos
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      // Define a propriedade 'price_with_discount' como FLOAT e não permite valores nulos
      price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,              // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'Product',  // Nome do modelo
      tableName: 'Products', // Nome da tabela no banco de dados
      timestamps: true,      // Adiciona colunas de timestamps (createdAt e updatedAt)
    }
  );

  // Retorna o modelo 'Product' para que possa ser usado em outras partes da aplicação
  return Product;
}

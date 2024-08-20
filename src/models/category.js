// Importa Model e DataTypes do módulo 'sequelize' para definir o modelo e suas propriedades
const { Model, DataTypes } = require('sequelize');

// Define e exporta o modelo 'Category'
module.exports = (sequelize) => {
  // Define a classe 'Category', que herda de Model do Sequelize
  class Category extends Model {

    // Método estático para definir associações entre modelos
    static associate(models) {

      // Define que uma categoria pode pertencer a muitos produtos
      // Isso cria uma relação de muitos-para-muitos usando a tabela associativa 'ProductCategory'
      Category.belongsToMany(models.Product, {
        through: models.ProductCategory,  // Tabela associativa
        foreignKey: 'category_id',        // Nome da chave estrangeira na tabela associativa
        as: 'products',                   // Nome do alias para a relação
      });
    }
  }

  // Inicializa o modelo 'Category' com suas propriedades e configurações
  Category.init(
    {
      // Define a propriedade 'id' como chave primária, do tipo INTEGER e auto-incrementada
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      // Define a propriedade 'use_in_menu' como BOOLEAN com valor padrão falso
      use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      // Configurações adicionais para o modelo
      sequelize,          // Instância do Sequelize para conectar o modelo ao banco de dados
      modelName: 'Category', // Nome do modelo
      tableName: 'categories', // Nome da tabela no banco de dados
      timestamps: true,   // Adiciona colunas de timestamps (createdAt e updatedAt)
    }
  );

  // Retorna o modelo 'Category' para que possa ser usado em outras partes da aplicação
  return Category;
}

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductCategories', {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductCategories');
  }
};

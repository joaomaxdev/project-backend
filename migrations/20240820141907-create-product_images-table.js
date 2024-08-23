'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductImages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
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
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT('long'),
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
    await queryInterface.dropTable('ProductImages');
  }
};

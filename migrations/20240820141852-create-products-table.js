'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      price_with_discount: {
        type: Sequelize.FLOAT,
        allowNull: true
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
    await queryInterface.dropTable('Products');
  }
};

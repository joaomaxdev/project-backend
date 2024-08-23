'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductOptions', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shape: {
        type: Sequelize.STRING,
        allowNull: true
      },
      radius: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      values: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('ProductOptions');
  }
};

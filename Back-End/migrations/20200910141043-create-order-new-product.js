'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderNewProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_of_order: {
        type: Sequelize.DATE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.FLOAT,
      },
      basket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Baskets',
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderNewProducts');
  },
};

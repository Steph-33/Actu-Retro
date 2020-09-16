'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BasketNewProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      basket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Baskets',
          key: 'id',
        },
      },
      new_product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'NewProducts',
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
    await queryInterface.dropTable('BasketNewProducts');
  },
};

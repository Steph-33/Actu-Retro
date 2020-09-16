'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UsedProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_of_announcement: {
        type: Sequelize.DATE,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('UsedProducts');
  },
};

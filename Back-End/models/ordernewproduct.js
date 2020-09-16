'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderNewProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.OrderNewProduct.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: 'user_id',
        },
      });
      models.OrderNewProduct.belongsTo(models.Basket, {
        foreignKey: {
          allowNull: true,
          name: 'basket_id',
        },
      });
    }
  }
  OrderNewProduct.init(
    {
      date_of_order: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      basket_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderNewProduct',
    }
  );
  return OrderNewProduct;
};

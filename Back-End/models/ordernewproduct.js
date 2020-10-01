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
      models.OrderNewProduct.belongsTo(models.Order, {
        foreignKey: {
          allowNull: true,
          name: 'order_id',
        },
      });
      models.OrderNewProduct.belongsTo(models.NewProduct, {
        foreignKey: {
          allowNull: true,
          name: 'new_product_id',
        },
      });
    }
  }
  OrderNewProduct.init(
    {
      quantity: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      new_product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderNewProduct',
    }
  );
  return OrderNewProduct;
};

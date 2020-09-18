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

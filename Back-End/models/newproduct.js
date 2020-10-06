'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.NewProduct.belongsToMany(models.Order, {
        through: 'OrderNewProducts',
        foreignKey: 'new_product_id',
        as: 'orders',
      });
    }
  }
  NewProduct.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'NewProduct',
    }
  );
  return NewProduct;
};

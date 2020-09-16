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
      models.NewProduct.belongsTo(models.Administrator, {
        foreignKey: {
          allowNull: true,
          name: 'administrator_id',
        },
      });
      models.NewProduct.belongsToMany(models.Basket, {
        through: 'BasketNewProducts',
        foreignKey: 'new_product_id',
      });
    }
  }
  NewProduct.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      picture: DataTypes.TEXT,
      administrator_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'NewProduct',
    }
  );
  return NewProduct;
};

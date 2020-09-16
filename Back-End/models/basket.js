'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Basket.hasOne(models.OrderNewProduct);
      models.Basket.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: 'user_id',
        },
      });
      models.Basket.belongsToMany(models.NewProduct, {
        through: 'BasketNewProducts',
        foreignKey: 'basket_id',
      });
    }
  }
  Basket.init(
    {
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Basket',
    }
  );
  return Basket;
};

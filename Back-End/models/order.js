'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: 'user_id',
        },
      });
      models.Order.belongsToMany(models.NewProduct, {
        through: 'OrderNewProducts',
        foreignKey: 'order_id',
      });
    }
  }
  Order.init(
    {
      date_of_order: DataTypes.DATE,
      total_price: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};

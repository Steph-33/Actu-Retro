'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UsedProduct.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: 'user_id',
        },
      });
    }
  }
  UsedProduct.init(
    {
      date_of_announcement: DataTypes.DATE,
      name: DataTypes.STRING,
      state: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      image: DataTypes.TEXT,
      location: DataTypes.STRING,
      contact: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UsedProduct',
    }
  );
  return UsedProduct;
};

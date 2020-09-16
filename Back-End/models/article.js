'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.belongsTo(models.Administrator, {
        foreignKey: {
          allowNull: true,
          name: 'administrator_id',
        },
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      image: DataTypes.STRING,
      administrator_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};

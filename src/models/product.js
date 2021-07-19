'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sku: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
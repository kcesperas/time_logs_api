'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    business_id: DataTypes.STRING,
    price_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    notes: DataTypes.STRING,
    deleted_at: DataTypes.Date,
    created_at: DataTypes.Date,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
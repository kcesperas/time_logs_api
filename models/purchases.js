'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchases.init({
    business_id: DataTypes.STRING,
    inventory_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    type: DataTypes.STRING,
    purchasedBy: DataTypes.STRING,
    notes: DataTypes.STRING,
    deleted_at: DataTypes.Date,
    created_at: DataTypes.Date,
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};
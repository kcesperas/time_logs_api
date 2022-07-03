'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
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
    product_id: Sequelize.INTEGER,
    inventory_id: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    price_unit: Sequelize.INTEGER,
    purchasedBy: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};
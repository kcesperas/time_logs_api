'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_items.init({
    qty: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    subtotal: Sequelize.INTEGER,
    notes: Sequelize.STRING,
    deletedAt: Sequelize.DATE
 
  }, {
    sequelize,
    modelName: 'order_items',
  });


  return order_items;
};
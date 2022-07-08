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
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE}
 
 
  }, {
    sequelize,
    modelName: 'order_items',
  });

  order_items.associate = function (models) {
    order_items.belongsTo(models.orders, {
      foreignKey: 'orderId', as: "orders"  
    });
  };
  
  return order_items;
};
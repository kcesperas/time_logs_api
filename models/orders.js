'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    description: DataTypes.STRING,
    order_no: DataTypes.STRING,
    total_amount: DataTypes.INTEGER,
    paidAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};
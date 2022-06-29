'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {

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
    description: Sequelize.STRING,
    order_no: Sequelize.STRING,
    total_amount: Sequelize.INTEGER,
    paidAt: Sequelize.DATE,
    createdBy: Sequelize.STRING,
    notes: Sequelize.STRING,
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE},
    
 
  }, {
    sequelize,
    modelName: 'orders',
  },)

  orders.associate = function (models) {
    orders.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"  
    });
  };


  return orders;
};
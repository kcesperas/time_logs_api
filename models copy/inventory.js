'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inventory.init({
    stocs: Sequelize.INTEGER,
    stock_limit: Sequelize.INTEGER,
    price_unit: Sequelize.INTEGER,
    cost_unit: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'inventory',
  });

  inventory.associate = function (models) {
    inventory.belongsTo(models.products, {
      foreignKey: 'productId', as: "product"  
    });
    inventory.hasMany(models.purchases, {
    foreignKey: 'purchaseId', as: "purchases"
    });

};


  return inventory;
};
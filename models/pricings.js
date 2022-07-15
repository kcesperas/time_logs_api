'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class pricings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pricings.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    discount_price: Sequelize.INTEGER,
    deletedAt: Sequelize.DATE
  }, {
    sequelize,
    modelName: 'pricings',
  });




pricings.associate = function (models) {
  pricings.belongsToMany(models.products, {
    through: "product_pricings",
    foreignKey: "pricingId",
    otherKey: "productId"    
  });
  };



  return pricings;
};
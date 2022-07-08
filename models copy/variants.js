'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class variants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  variants.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    type: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'variants',
  });

  variants.associate = function (models) {
    variants.belongsToMany(models.products, {
      through: 'product_variant_table',
      foreignKey: 'variantId', as: "variant"  
    });
};

  return variants;
};
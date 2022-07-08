'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
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
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    inStock: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    sale_price: Sequelize.INTEGER,
    featured_image: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'products',
  });


  products.associate = function (models) {
    products.belongsToMany(models.variants, {
      through: 'product_variant_table',
      foreignKey: 'productId', as: "product"  
    });
  products.belongsTo(models.inventory, {
    foreignKey: 'inventoryId', as: "inventory"
  });

};

  return products;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    deletedAt: DataTypes.DATE


  }, {
    sequelize,
    modelName: 'products',
  });



  products.associate = function (models) {
    products.belongsToMany(models.tags, {
      through: "product_tags",
      foreignKey: "productId",
      otherKey: "tagId"    
    });

    products.belongsToMany(models.pricings, {
      through: "product_pricings",
      foreignKey: "productId",
      otherKey: "pricingId"    
    });

    products.belongsTo(models.pricings, {
      as: 'product_price'  
    });


    products.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"
    });


  };




  return products;
};
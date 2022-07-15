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
    logo: Sequelize.STRING,
    price: Sequelize.STRING,
    deletedAt: { 
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    }


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

    products.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"
    });


  };




  return products;
};
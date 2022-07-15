'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tags.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    deletedAt: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'tags',
  });


  tags.associate = function (models) {
    tags.belongsToMany(models.products, {
      through: "product_tags",
      foreignKey: "tagId",
      otherKey: "productId"    
    });
  }



  return tags;
};
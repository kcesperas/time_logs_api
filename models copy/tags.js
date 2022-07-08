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
    notes: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tags',
  });

  tags.associate = function (models) {
    tags.belongsToMany(models.customers, {
      through: "customer_tags",
      foreignKey: "tagId",
      otherKey: "customerId"    
    });
  }

  return tags;
};
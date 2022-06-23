'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  business.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.TEXT,
      email_address: DataTypes.STRING,
      description: DataTypes.STRING,
      notes: DataTypes.TEXT,
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'business',
  });
  return business;
};
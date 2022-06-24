'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    address: DataTypes.TEXT,
    note: DataTypes.STRING,
    phones: DataTypes.INTEGER,
    limit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};
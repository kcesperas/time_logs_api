'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
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
    name: Sequelize.STRING,
    email_address: Sequelize.STRING,
    address: Sequelize.TEXT,
    notes: Sequelize.STRING,
    phones: Sequelize.INTEGER,
    limit: Sequelize.INTEGER,
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE}
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};
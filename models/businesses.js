'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class businesses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  businesses.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    address: Sequelize.TEXT,
      email: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
  }, {
    sequelize,
    modelName: 'businesses',
  });

  return businesses;
};
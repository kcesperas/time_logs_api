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
    email: Sequelize.STRING,
    description: Sequelize.STRING,
    address: Sequelize.TEXT,
    createdAt: { 
        allowNull: false,
        type: Sequelize.DATE,
        defaulValue: new Date(),
      },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
       defaulValue: new Date(),
      },
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
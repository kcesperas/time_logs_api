'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  phones.init({
    phone: Sequelize.STRING,
    label: Sequelize.STRING,
    notes: Sequelize.STRING,
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE}
  }, {
    sequelize,
    modelName: 'phones',
  });
  return phones;
};
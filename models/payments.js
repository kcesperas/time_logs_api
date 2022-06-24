'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payments.init({
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    notes: DataTypes.STRING
      // sequelize.define('BusinessModel', {
      // business_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: BusinessModel,
      //     key: 'id',
      //  deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE/
      // },
      // },
  }, {
    sequelize,
    modelName: 'payments',
  });
  return payments;
};
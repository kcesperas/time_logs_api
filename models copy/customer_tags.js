'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class customerTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  customerTags.init({
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    tagId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    notes: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'customer_tags',
  });

  return customerTags;
};
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
<<<<<<< HEAD
    notes: DataTypes.STRING,
=======
    note: DataTypes.STRING,
>>>>>>> d08519757952821f54c584b6a9cef8bacf3229b0
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};
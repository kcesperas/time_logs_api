'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    fullName: Sequelize.STRING,
    emailAddress: Sequelize.STRING,
    address: Sequelize.STRING,
    password: Sequelize.STRING,
    birthDate: Sequelize.STRING,
    gender: Sequelize.STRING,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'users',
  });


  users.associate = function (models) {
    users.belongsTo(models.roles, {
      through: "user_roles",
      foreignKey: "userId"
    });

  };

  return users;
};
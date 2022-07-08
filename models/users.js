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
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.TEXT,
    password: Sequelize.STRING,
    suspendedBy: Sequelize.STRING,
    suspendedAt: Sequelize.DATE,
    dpUrl: Sequelize.STRING,
    lastLoginAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE
    }, {
    sequelize,
    modelName: 'users',
  });

  users.associate = function (models) {
    users.belongsToMany(models.roles, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId"    
    });

    users.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"
    });


  };


  return users;
};
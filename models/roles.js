'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles.init({
    name: Sequelize.STRING,
    note: Sequelize.STRING,
    deletedAt: Sequelize.DATE
  }, {
    sequelize,
    modelName: 'roles',
  });


  roles.associate = function (models) {
    roles.belongsToMany(models.users, {
      through: "user_roles",
      foreignKey: "roleId",
      otherKey: "userId" 
    });
  };

  return roles;
};
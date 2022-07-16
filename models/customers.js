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
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    limit: Sequelize.STRING,
    isPaid: Sequelize.BOOLEAN,
    starred: Sequelize.BOOLEAN,
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
    modelName: 'customers',
  });



  customers.associate = function (models) {
    customers.belongsTo(models.businesses, {
      foreignKey: 'businessId'
    });

  customers.belongsToMany(models.tags, {
      through: "customer_tags",
      foreignKey: "customerId",
      otherKey: "tagId"    
    });



  customers.belongsToMany(models.phones, {
    through: "customer_phones",
    foreignKey: "customerId",
    otherKey: "phoneId"    
    });
    

  customers.belongsTo(models.phones, {
    foreignKey: 'customer_phoneId',  as: "customer_phone"
    });

  
  
};


return customers;

}
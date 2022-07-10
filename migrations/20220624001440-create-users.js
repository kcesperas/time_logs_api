'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'inactive'
      },
      password: {
        type: Sequelize.STRING
      },
      suspendedBy: { 
        type: Sequelize.STRING
      },
      suspendedAt: { 
        type: Sequelize.DATE
      },
      dpUrl: { 
        type: Sequelize.STRING
      },
      lastLoginAt: { 
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      deletedAt: { 
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
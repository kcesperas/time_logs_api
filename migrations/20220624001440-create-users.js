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
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
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
        type: Sequelize.DATE
      },
      deletedAt: { 
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
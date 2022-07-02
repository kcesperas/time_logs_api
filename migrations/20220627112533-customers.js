'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.STRING
      },
      phones: {
        type: Sequelize.INTEGER
      },
      limit: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      businessId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'businesses'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
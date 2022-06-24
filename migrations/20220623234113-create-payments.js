'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      // sequelize.define('Model', {
      // business_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: BusinessModel,
      //     key: 'id',
            //  deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE/
      // },
      // },
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
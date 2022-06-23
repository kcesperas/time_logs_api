'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payloads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      tenant_id: {
        type: Sequelize.INTEGER
      },
      payload: {
        type: Sequelize.TEXT
      },
      query_params: {
        type: Sequelize.STRING
      },
      export_type: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.INTEGER
      },
      hash_id:{
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payloads');
  }
};

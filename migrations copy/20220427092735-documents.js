'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      payload_id: {
        type: Sequelize.INTEGER
      },
      tenant_id: {
        type: Sequelize.INTEGER
      },
      html_file: {
        type: Sequelize.STRING
      },
      html_url: {
        type: Sequelize.STRING
      },
      pdf_file: {
        type: Sequelize.STRING
      },
      pdf_url: {
        type: Sequelize.STRING
      },
      excel_file: {
        type: Sequelize.STRING
      },
      excel_url: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      file_type:{
        type: Sequelize.STRING
      },
      hash_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      completed: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Documents');
  }
};
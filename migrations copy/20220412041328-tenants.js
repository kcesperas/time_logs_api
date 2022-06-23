'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tenants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      tenant_id: {
        type: Sequelize.STRING

      },
      app_id: {
        type: Sequelize.STRING

      },
      name: {
        type: Sequelize.STRING

      },
      description: {
        type: Sequelize.STRING

      },
      website_url: {
        type: Sequelize.STRING

      },
      auth_callback_url: {
        type: Sequelize.STRING

      },
      client_id: {
        type: Sequelize.STRING

      },
      client_secret: {
        type: Sequelize.STRING

      },
      webhook_url: {
        type: Sequelize.STRING

      },
      is_active: {
        type: Sequelize.BOOLEAN

      },
      created_at: {
        type: Sequelize.DATE

      },
      updated_at: {
        type: Sequelize.DATE

      }

    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tenants');
  }
};

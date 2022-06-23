'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('tenants',[
          {
            id: 1,
            app_id: '12',
            tenant_id: '1',
            name: "LSGH",
            description: "sample description for LSGH",
            website_url: null,
            auth_callback_url: null,
            client_id: null,
            client_secret: null,
            webhook_url: null,
            is_active: true

            

        },{
          id: 2,
          app_id: '1',
          tenant_id: '1',
          name: "LSGH",
          description: "sample description for LSGH",
          website_url: null,
          auth_callback_url: null,
          client_id: null,
          client_secret: null,
          webhook_url: null,
          is_active: true

          

      },
      ])
      ])
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('tenants', null, {})
      ])
    })
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

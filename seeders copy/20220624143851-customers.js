'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('customers',[
          {
          name: "customers 1",
          email_address: "cs1@email.com",
          address: "sample address 1",
          limit: "1000",
          notes: "customer notes 1",
          businessId: 1
        },{
          name: "customers 2",
          email_address: "cs2@email.com",
          address: "sample address 2",
          limit: "2000",
          notes: "customer notes 2",
          businessId: 1

        },{
          name: "customers 3",
          email_address: "cs3@email.com",
          address: "sample address 3",
          limit: "3000",
          notes: "customer notes 3",
          businessId: 2
    }

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
        queryInterface.bulkDelete('customers', null, {})
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

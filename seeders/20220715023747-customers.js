'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('customers',[
          {
          id: 1,
          name: "Mark Steven",
          email: "cs1@email.com",
          address: "sample address 1",
          limit: "1000",
          businessId: 1,
          customer_phoneId: 1
        },{
          id: 2,
          name: "Marty Gee",
          email: "cs2@email.com",
          address: "sample address 2",
          limit: "2000",
          businessId: 1,
          customer_phoneId: 2

        },{
          id: 3,
          name: "Brix D",
          email: "cs3@email.com",
          address: "sample address 3",
          limit: "3000",
          businessId: 1,
          customer_phoneId: 3
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

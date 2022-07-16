'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('customer_phones',[
          {
            phoneId: 1,
            customerId: 1,
            createdAt: new Date,
            updatedAt: new Date
        },{
          phoneId: 3,
          customerId: 2,
          createdAt: new Date,
          updatedAt: new Date
      },{
        phoneId: 3,
        customerId: 3,
        createdAt: new Date,
        updatedAt: new Date
    },{
      phoneId: 4,
      customerId: 1,
      createdAt: new Date,
      updatedAt: new Date
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
        queryInterface.bulkDelete('customer_phones', null, {})
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

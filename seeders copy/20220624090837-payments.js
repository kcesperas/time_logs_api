'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('payments',[
          {
          description: "payment 1",
          amount: 25000,
          type: "cash",
          notes: "payment note1"
        },{
          description: "payment 2",
          amount: 30000,
          type: "cash",
          notes: "payment note2"
      },{
          description: "payment 3",
          amount: 40000,
          type: "cash",
          notes: "payment note3"
    },

      ])
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('payments', null, {})
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

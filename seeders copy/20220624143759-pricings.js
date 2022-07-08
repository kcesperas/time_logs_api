'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('pricings',[
          {
          name: "price 1",
          description: "price 1",
          amount: 10,
          notes: "pricing note1"


        },{
          name: "price 2",
          description: "price 2",
          amount: 20,
          notes: "pricing note2"
        },{
          name: "price 3",
          description: "price 3",
          amount: 30,
          notes: "pricing note3"
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
        queryInterface.bulkDelete('pricings', null, {})
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

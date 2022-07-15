'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('phones',[
          {
          id: 1,
          phone: "11111111111",
          label: "Globe",
          notes: "phones notes 1"
        },{
          id: 2,
          phone: "2222222222",
          label: "Smart",
          notes: "phones notes 2"
        },{
          id: 3,
          phone: "3333333333",
          label: "Dito",
          notes: "phones notes 3"
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
        queryInterface.bulkDelete('phones', null, {})
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

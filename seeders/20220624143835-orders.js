'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('orders',[
          {
          description: "orders 1",
          order_no: "10",
          total_amount: 100,
          createdBy: "orders note1",
          notes: "order notes 1"
        },{
          description: "orders 2",
          order_no: "20",
          total_amount: 200,
          createdBy: "orders note2",
          notes: "order notes 2"
        },{
          description: "orders 3",
          order_no: "30",
          total_amount: 300,
          createdBy: "orders note3",
          notes: "order notes 3"
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
        queryInterface.bulkDelete('orders', null, {})
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

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('order_items',[
          {
          qty: "order_item 1",
          price: "10",
          subtotal: 100,
          notes: "order_item note1"
        },{
          qty: "order_item 2",
          price: "20",
          subtotal: 200,
          notes: "order_item note2"
        },{
          qty: "order_item 3",
          price: "30",
          subtotal: 300,
          notes: "order_item note3"
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
        queryInterface.bulkDelete('order_items', null, {})
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

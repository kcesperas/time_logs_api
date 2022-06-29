'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('tags',[
          {
            id: 1,
            business_id: '5',
            inventoy_id: '5',
            product_id: '5',
            quantity: '15',
            price: '150',
            total: '250',
            type: 'type1',
            notes: 'hahahaha',
        },{
            id: 2,
            business_id: '2',
            inventoy_id: '2',
            product_id: '2',
            quantity: '12',
            price: '120',
            total: '222',
            type: 'type2',
            notes: 'hehehehe',
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
        queryInterface.bulkDelete('purchases', null, {})
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

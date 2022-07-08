'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('products',[
          {
            id: 1,
            businessId: 1,
            priceId: '5',
            name: 'product name 1',
            description: 'product name 1',
            type: 'product name 1',
            notes: 'product name 1',
        },{
            id: 2,
            businessId: 1,
            priceId: '2',
            name: 'product name 2',
            description: 'product name 2',
            type: 'product name 2',
            notes: 'product name 2',
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
        queryInterface.bulkDelete('products', null, {})
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

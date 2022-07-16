'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('pricings',[
          {
            id: 1,
            name: 'Piece',
            price: 10,
            discount_price: 9
        },{
          id: 2,
          name: 'Kilo',
          price: 200,
          discount_price: 180
      },{
        id: 3,
        name: 'Kilo',
        price: 100,
        discount_price: 80
    },{
      id: 4,
      name: 'kilo',
      price: 200,
      discount_price: 180
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

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('products',[
          {
            id: 1,
            name: 'Hammer',
            description: "Mikata Hammer yellow",
            product_priceId: 1,
            businessId: 3
        },{
          id: 2,
          name: 'Basic Nail - 14"',
          description: "Basic Nail 14 inch",
          product_priceId: 3,
          businessId: 3
      },{
        id: 3,
        name: 'Concrete Nail',
        description: "Concrete nail",
        product_priceId: 2,
        businessId: 3
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

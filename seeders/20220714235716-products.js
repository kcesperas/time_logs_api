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
            price: 100,
            discount_price: 90,
            stocks: 100,
            limit: 50,
            businessId: 3,
            starred: true
        },{
          id: 2,
          name: 'Basic Nail - 14"',
          description: "Basic Nail 14 inch",
          businessId: 3,
          price: 200,
          discount_price: 180,
          stocks: 50,
          limit: 10,
          starred: false
      },{
        id: 3,
        name: 'Concrete Nail',
        description: "Concrete nail",
        businessId: 3,
        price: 150,
        discount_price: 140,
        stocks: 190,
        limit: 30,
        starred: false

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

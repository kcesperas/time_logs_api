'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('customer_tags',[
          {
            customerId: 1,
            tagId: 4
        },{
          customerId: 2,
          tagId: 5
      },{
        customerId: 3,
        tagId: 6
    },{
      customerId: 4,
      tagId: 4
  },{
    customerId: 1,
    tagId: 6
},{
  customerId: 2,
  tagId: 5
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
        queryInterface.bulkDelete('customer_tags', null, {})
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

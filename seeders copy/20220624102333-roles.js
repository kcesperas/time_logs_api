'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('roles',[
          {
            id: 1,
            name: 'super',
            note: 'geli'
        },{
          id: 2,
          name: 'cashier',
          note: 'esperas'
      },{
        id: 3,
        name: 'user',
        note: 'anonym'
    },
    {
      id: 4,
      name: 'admin',
      note: 'geli'
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
        queryInterface.bulkDelete('roles', null, {})
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

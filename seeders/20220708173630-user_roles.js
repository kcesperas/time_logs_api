'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('user_roles',[
          {
            userId: 1,
            roleId: 4,
            createdAt: new Date,
            updatedAt: new Date
        },{
            userId: 2,
            roleId: 4,
            createdAt: new Date,
            updatedAt: new Date
      },{
            userId: 3,
            roleId: 1,
            createdAt: new Date,
            updatedAt: new Date
    },
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
        queryInterface.bulkDelete('user_roles', null, {})
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

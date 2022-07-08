'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('businesses',[
          {
            id: 1,
            name: 'BugTech',
            description: 'geli',
            email_address: "jb@yahoo.com",
            address: "Tacloban City",
        },{
          id: 2,
          name: 'Savorich',
          description: 'esperas',
          email_address: "kurt@yahoo.com",
          address: "Tacloban City",
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
        queryInterface.bulkDelete('businesses', null, {})
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

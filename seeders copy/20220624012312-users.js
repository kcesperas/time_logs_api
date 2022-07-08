'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('users',[
          {
            id: 1,
            name: 'jb',
            username: "jbp",
            email_address: "jb@yahoo.com",
            address: "Tacloban City",
            businessId: 1,
            password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK"
        },{
          id: 2,
          firstName: 'kurt',
          lastName: 'esperas',
          username: "kurt",
          email_address: "kurt@yahoo.com",
          address: "Tacloban City",
          businessId: 2,
          password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK"
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
        queryInterface.bulkDelete('users', null, {})
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

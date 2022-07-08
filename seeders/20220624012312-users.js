'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('users',[
          {
            id: 3,
            name: 'jb',
            email: "jb@yahoo.com",
            address: "test address",
            password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
            businessId: 1
        },{
            id: 1,
            name: 'esperas',
            email: "kurt@yahoo.com",
            address: "test address",
            password: "$2a$08$whWB3p.pUtyq/mpICtybKu/gMYjBCAk.1mBWlTj6oGRwS3YYlNlJm",
            businessId: 2
      }, {
            id: 2,
            name: 'esperas',
            email: "kur1t@yahoo.com",
            address: "test address",
            password: "$2a$08$Qxgt/qb.fRZ7QN8qgZmyVOoVncYZMP2yYTBL.dUrpTB0NIlWGVKfm",
            businessId: 1
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

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('users',[
            {
            id: 1,
            fullName: 'jb depp',
            emailAddress: "jb@yahoo.com",
            password: "$2a$08$d8EuWRJ4PHSguI.qDSwVtOstNmDghFK6O6dC8qmp9eooXMlo.Q6CC"
            },{
            id: 2,
            fullName: "marty d'Caprio",
            emailAddress: "mart@yahoo.com",
            password: "$2a$08$cHz5/dB2sHqCve9k1Vqjnuu7osfRVE/TtX1z0hDygDlYakzJuzy5G"
            },{
            id: 3,
            fullName: 'mark pitt',
            emailAddress: "mark@yahoo.com",
            password: "$2a$08$qiONkSNnzA9I5XmhJuZh8uqQ.FXQ7Z37ZYVfQgqGfBlX.dy6G6gqC"
            },{
            id: 4,
            fullName: 'kurt hemsworth',
            emailAddress: "kurt@yahoo.com",
            password: "$2a$08$5ba5CQvDcpzjR2ad6LXzgeC2Et1xM1CKljK4UQplXJMyINExZKdb2"
            },{
            id: 5,
            fullName: 'brix franco',
            emailAddress: "brix@yahoo.com",
            password: "$2a$08$242KVD1WES3kf1w9Il4.WOV77ZEq4J6MyLt5kdZP5xM5avnpuCsTm"
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
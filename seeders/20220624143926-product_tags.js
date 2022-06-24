// 'use strict';

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     return queryInterface.sequelize.transaction(t => {
//       return Promise.all([
//         queryInterface.bulkInsert('tags',[
//           {
//           notes: "sports equipment"
//         },{
//           notes: "mobile accessories"
//         },{
//           notes: "hygiene and safety"
//     }

//       ])
//       ])
//     })
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     return queryInterface.sequelize.transaction(t => {
//       return Promise.all([
//         queryInterface.bulkDelete('tags', null, {})
//       ])
//     })
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

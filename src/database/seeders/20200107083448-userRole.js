'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('userRole', [{
        name: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'travel-team-member',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'travel-administration',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('userRole', null, {});
    
  }
};

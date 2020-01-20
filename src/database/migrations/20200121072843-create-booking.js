'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userid: { type: Sequelize.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE', references: { model: 'users', key: 'id' } },
      accommodationid: { type: Sequelize.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE', references: { model: 'accomodation', key: 'id' } },
      roomid: { type: Sequelize.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE', references: { model: 'rooms', key: 'id' } },
      departuredate: { type: Sequelize.DATE },
      checkoutdate: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};

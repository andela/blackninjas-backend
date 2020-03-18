const metadata = (Sequelize) => {
  return {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: true,
    references: { model: 'trips', key: 'id' }
  }
};

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((transaction) => {
        return Promise.all([
          queryInterface.addColumn('bookings', 'tripid', metadata(Sequelize), { transaction }),
        ])
      })
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((transaction) => {
        return Promise.all([
          queryInterface.removeColumn('bookings', 'tripid', { transaction }),
        ])
      })
    }
  }; 

const metadata = (Sequelize) => {
  return {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: true,
    defaultValue: 0,
  }
};

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((transaction) => {
        return Promise.all([
          queryInterface.addColumn('accomodation', 'numberOfRooms', metadata(Sequelize), { transaction }),
          queryInterface.addColumn('accomodation', 'availableRooms', metadata(Sequelize), { transaction }),
          queryInterface.removeColumn('accomodation', 'image', { transaction })
        ])
      })
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((transaction) => {
        return Promise.all([
          queryInterface.removeColumn('accomodation', 'numberOfRooms', { transaction }),
          queryInterface.removeColumn('accomodation', 'availableRooms', { transaction }),
          queryInterface.addColumn('accomodation', 'image', {type: Sequelize.STRING}, { transaction })
        ])
      })
    }
  }; 

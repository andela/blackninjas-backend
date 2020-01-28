const metadata = (Sequelize) => {
    return {
      type: Sequelize.FLOAT,
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
            queryInterface.addColumn('accomodation', 'averageRate', metadata(Sequelize), { transaction }),
          ])
        })
      },
  
      down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => {
          return Promise.all([
            queryInterface.removeColumn('accomodation', 'averageRate', { transaction }),
          ])
        })
      }
    }; 
  
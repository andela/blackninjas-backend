const metadata = (Sequelize) => {
    return {
      type: Sequelize.STRING,
    }
  };
  
  module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => {
          return Promise.all([
            queryInterface.addColumn('notifications', 'subjectId', metadata(Sequelize), { transaction }),
          ])
        })
      },
  
      down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => {
          return Promise.all([
            queryInterface.removeColumn('notifications', 'subjectId', { transaction }),
          ])
        })
      }
    }; 
  
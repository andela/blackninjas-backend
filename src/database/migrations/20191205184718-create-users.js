
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      defaultValue: 'unknown'
    },
    lastname: {
      type: Sequelize.STRING,
      defaultValue: 'unknown'
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: 'unknown'
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: 'Password1'
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: 'false'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('users')
};

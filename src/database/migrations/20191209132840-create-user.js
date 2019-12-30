module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.DATE
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    preferredlanguage: {
      type: Sequelize.STRING
    },
    preferredcurrency: {
      type: Sequelize.STRING
    },
    place: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    authtype: {
      type: Sequelize.STRING
    },
    profileImage: {
      type: Sequelize.STRING
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
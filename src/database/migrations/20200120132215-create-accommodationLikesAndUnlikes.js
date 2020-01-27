'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accommodationLikesAndUnlikes', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            userid: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
            accommodationid: { type: Sequelize.INTEGER, references: { model: 'accomodation', key: 'id' } },
            islike: { type: Sequelize.BOOLEAN },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('accommodationLikesAndUnlikes');
    }
};

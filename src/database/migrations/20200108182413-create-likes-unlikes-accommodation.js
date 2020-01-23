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
                queryInterface.addColumn('accomodation', 'likes', metadata(Sequelize), { transaction }),
                queryInterface.addColumn('accomodation', 'unlikes', metadata(Sequelize), { transaction })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((transaction) => {
            return Promise.all([
                queryInterface.removeColumn('accomodation', 'likes', { transaction }),
                queryInterface.removeColumn('accomodation', 'unlikes', { transaction })
            ])
        })
    }
};

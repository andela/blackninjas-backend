module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('rooms', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        accomodationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'accomodation',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        typeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'accomodationtypes',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, 
        price: {
          type: Sequelize.FLOAT
        },
        status: {
          type: Sequelize.STRING
        },
        currency: {
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
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('rooms');
    }
  };
  

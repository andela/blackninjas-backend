module.exports = (sequelize, DataTypes) => {
  const trips = sequelize.define('trips', {
    tripId: DataTypes.INTEGER,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    accomodationId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    leavingDays: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  trips.associate = (models) => {
    trips.belongsTo(
      models.locations,
      { foreignKey: 'originId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    trips.belongsTo(
      models.locations,
      { foreignKey: 'destinationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    trips.belongsTo(
      models.rooms,
      { foreignKey: 'accomodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    trips.belongsTo(
      models.user,
      { foreignKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return trips;
};

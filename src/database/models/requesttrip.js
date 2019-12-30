module.exports = (sequelize, DataTypes) => {
  const requesttrip = sequelize.define('requesttrip', {
    userId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  requesttrip.associate = (models) => {
    requesttrip.belongsTo(
      models.user,
      { foreignKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    requesttrip.belongsTo(
      models.user,
      { foreignKey: 'managerId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    requesttrip.belongsTo(
      models.trips,
      { foreignKey: 'tripId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return requesttrip;
};

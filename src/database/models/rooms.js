module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
    accomodationId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {});
  rooms.associate = (models) => {
    rooms.belongsTo(
      models.accomodation,
      { foreignKey: 'accomodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    rooms.belongsTo(
      models.accomodationtype,
      { foreignKey: 'typeId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return rooms;
};

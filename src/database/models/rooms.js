module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    accomodationId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    currency: DataTypes.STRING,
    status: DataTypes.STRING
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

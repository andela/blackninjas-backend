module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    userid: DataTypes.INTEGER,
    accommodationid: DataTypes.INTEGER,
    tripid: DataTypes.INTEGER,
    roomid: DataTypes.INTEGER,
    departuredate: DataTypes.DATE,
    checkoutdate: DataTypes.DATE
  }, {});
  booking.associate = (models) => {
    booking.belongsTo(models.user, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    booking.belongsTo(models.trips, {
      foreignKey: 'tripid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    booking.belongsTo(models.accomodation, {
      foreignKey: 'accommodationid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    booking.belongsTo(models.rooms, {
      foreignKey: 'roomid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return booking;
};

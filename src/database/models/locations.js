module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {});
  locations.associate = (models) => {
    locations.hasMany(models.accomodation, {
      foreignKey: 'locationId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return locations;
};

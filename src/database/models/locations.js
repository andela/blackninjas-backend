
module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {});
  locations.associate = () => {
    // associations can be defined here
  };
  return locations;
};


module.exports = (sequelize, DataTypes) => {
  const accomodationRates = sequelize.define('accomodationRates', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {});
  accomodationRates.associate = (models) => {
    accomodationRates.belongsTo(
      models.accomodation,
      { foreignKey: 'accommodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    accomodationRates.belongsTo(
      models.user,
      { foreignKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return accomodationRates;
};

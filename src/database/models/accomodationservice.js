
module.exports = (sequelize, DataTypes) => {
  const accomodationservice = sequelize.define('accomodationservice', {
    name: DataTypes.STRING,
    accomodationId: DataTypes.INTEGER
  }, {});
  accomodationservice.associate = (models) => {
    accomodationservice.belongsTo(
      models.accomodation,
      { foreignKey: 'accomodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return accomodationservice;
};

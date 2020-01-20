
module.exports = (sequelize, DataTypes) => {
  const accomodationamenity = sequelize.define('accomodationamenity', {
    name: DataTypes.STRING,
    accomodationId: DataTypes.INTEGER
  }, {});
  accomodationamenity.associate = (models) => {
    accomodationamenity.belongsTo(
      models.accomodation,
      { foreignKey: 'accomodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return accomodationamenity;
};

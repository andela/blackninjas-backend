module.exports = (sequelize, DataTypes) => {
  const accomodation = sequelize.define('accomodation', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'accomodation'
  });
  accomodation.associate = (models) => {
    accomodation.belongsTo(
      models.locations,
      { foreignKey: 'locationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return accomodation;
};

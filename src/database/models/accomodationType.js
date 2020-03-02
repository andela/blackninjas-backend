module.exports = (sequelize, DataTypes) => {
  const accomodationtype = sequelize.define('accomodationtype', {
    name: DataTypes.STRING
  }, {});
  accomodationtype.associate = (models) => {
    accomodationtype.hasMany(models.rooms, {
      foreignKey: 'typeId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return accomodationtype;
};

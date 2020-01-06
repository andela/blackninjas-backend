module.exports = (sequelize, DataTypes) => {
  const usermanagement = sequelize.define('usermanagement', {
    userId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
  }, {});
  usermanagement.associate = (models) => {
    usermanagement.belongsTo(
      models.user,
      { foreignKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    usermanagement.belongsTo(
      models.user,
      { foreignKey: 'managerId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return usermanagement;
};

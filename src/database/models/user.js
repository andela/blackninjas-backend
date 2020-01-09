module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    birthdate: { type: DataTypes.DATE, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    preferredlanguage: { type: DataTypes.STRING, allowNull: true },
    preferredcurrency: { type: DataTypes.STRING, allowNull: true },
    place: { type: DataTypes.STRING, allowNull: true },
    token: { type: DataTypes.STRING(500), allowNull: true },
    department: { type: DataTypes.STRING, allowNull: true },
    profileImage: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true },
    authtype: { type: DataTypes.STRING, allowNull: true }
  }, {});
  user.associate = () => {
    // user.hasMany(models.requestTrip, { foreignKey: 'lineManager', sourceKey: 'id' });
  };
  return user;
};

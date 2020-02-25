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
    role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'requester' },
    authtype: { type: DataTypes.STRING, allowNull: true },
    appNotification: { type: DataTypes.BOOLEAN },
    emailNotification: { type: DataTypes.BOOLEAN },
  }, {});
  user.associate = (models) => {
    user.hasMany(models.comment, {
      foreignKey: 'commentorId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return user;
};

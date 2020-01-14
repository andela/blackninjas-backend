export default (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    receiver: DataTypes.INTEGER,
    requestId: { type: DataTypes.INTEGER, allowNull: true },
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  }, {});
  notification.associate = (models) => {
    notification.belongsTo(models.user, {
      foreignKey: 'receiver',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return notification;
};

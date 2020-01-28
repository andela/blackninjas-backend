
module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    message: DataTypes.STRING,
    receiverId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER
  }, {});
  chats.associate = (models) => {
    // associations can be defined here
    chats.belongsTo(
      models.user,
      { foreignKey: 'receiverId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    chats.belongsTo(
      models.user,
      { foreignKey: 'senderId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return chats;
};

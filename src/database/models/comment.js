module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    subjectId: DataTypes.STRING,
    subjectType: DataTypes.STRING,
    commentorId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  comment.associate = (models) => {
    comment.belongsTo(
      models.user,
      {
        foreignKey: 'commentorId', onUpdate: 'cascade', onDelete: 'cascade', targetKey: 'id'
      }
    );
  };
  return comment;
};

module.exports = (sequelize, DataTypes) => {
  const accommodationLikesAndUnlikes = sequelize.define('accommodationLikesAndUnlikes', {
    userid: DataTypes.INTEGER,
    accommodationid: DataTypes.INTEGER,
    islike: DataTypes.BOOLEAN
  }, {});
  accommodationLikesAndUnlikes.associate = () => {
    // associations can be defined here
  };
  return accommodationLikesAndUnlikes;
};

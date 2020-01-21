
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    recordId: DataTypes.INTEGER,
    imageType: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  return image;
};

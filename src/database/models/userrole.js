
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define('userRole', {
    name: DataTypes.STRING
  }, {});
  return userRole;
};

module.exports = (sequelize, DataTypes) => {
  const accomodationtype = sequelize.define('accomodationtype', {
    name: DataTypes.STRING
  }, {});
  accomodationtype.associate = () => {
    // association goes here
  };
  return accomodationtype;
};

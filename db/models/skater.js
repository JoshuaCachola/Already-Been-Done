'use strict';
module.exports = (sequelize, DataTypes) => {
  const skater = sequelize.define('skater', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    crewId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING
  }, {});
  skater.associate = function(models) {
    // associations can be defined here
  };
  return skater;
};
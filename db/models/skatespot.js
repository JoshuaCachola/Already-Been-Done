'use strict';
module.exports = (sequelize, DataTypes) => {
  const SkateSpot = sequelize.define('SkateSpot', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lat: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    lon: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  }, {});
  SkateSpot.associate = function (models) {
    // associations can be defined here
  };
  return SkateSpot;
};

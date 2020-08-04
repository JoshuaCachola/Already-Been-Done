"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkateSpot = sequelize.define(
    "SkateSpot",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      imgs: {
        type: DataTypes.ARRAY(DataTypes.STRING(255)),
      },
    },
    {}
  );
  SkateSpot.associate = function (models) {
    SkateSpot.hasMany(models.SkatePost, {
      foreignKey: "skateSpotId",
    });

    SkateSpot.hasMany(models.SkateSpotFollowing, {
      foreignKey: "skateSpotId",
    });
  };
  return SkateSpot;
};

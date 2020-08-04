"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkateSpotFollowing = sequelize.define(
    "SkateSpotFollowing",
    {
      skaterId: DataTypes.INTEGER,
      skateSpotId: DataTypes.INTEGER,
    },
    {}
  );
  SkateSpotFollowing.associate = function (models) {
    SkateSpotFollowing.belongsTo(models.SkateSpot, {
      foreignKey: "skateSpotId",
    });

    SkateSpotFollowing.belongsTo(models.Skater, {
      foreignKey: "skaterId",
    });
  };
  return SkateSpotFollowing;
};

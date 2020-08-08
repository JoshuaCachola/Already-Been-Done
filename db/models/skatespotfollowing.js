"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkateSpotFollowing = sequelize.define(
    "SkateSpotFollowing",
    {
      skaterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skateSpotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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

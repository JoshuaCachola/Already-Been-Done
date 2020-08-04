"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkateCrew = sequelize.define(
    "SkateCrew",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  SkateCrew.associate = function (models) {
    SkateCrew.hasMany(models.SkateCrewSkater, {
      foreignKey: "skateCrewId",
    });
  };
  return SkateCrew;
};

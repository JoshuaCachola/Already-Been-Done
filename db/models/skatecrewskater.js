"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkateCrewSkater = sequelize.define(
    "SkateCrewSkater",
    {
      skaterId: DataTypes.NUMBER,
      skateCrewId: DataTypes.NUMBER,
    },
    {}
  );
  SkateCrewSkater.associate = function (models) {
    SkateCrewSkater.belongsTo(models.Skater, {
      foreignKey: "skaterId",
    });

    SkateCrewSkater.belongsTo(models.SkateCrew, {
      foreignKey: "skateCrewId",
    });
  };
  return SkateCrewSkater;
};

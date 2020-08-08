"use strict";
module.exports = (sequelize, DataTypes) => {
  const LikedPost = sequelize.define(
    "LikedPost",
    {
      skaterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  LikedPost.associate = function (models) {
    LikedPost.belongsTo(models.Skater, {
      foreignKey: "skaterId",
    });

    LikedPost.belongsTo(models.SkatePost, {
      foreignKey: "postId",
    });
  };
  return LikedPost;
};

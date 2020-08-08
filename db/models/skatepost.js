"use strict";
module.exports = (sequelize, DataTypes) => {
  const SkatePost = sequelize.define(
    "SkatePost",
    {
      post: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING(255)),
      },
      skateSpotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      skaterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      caption: {
        type: DataTypes.STRING,
      },
      boardTaps: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  SkatePost.associate = function (models) {
    SkatePost.belongsTo(models.SkateSpot, {
      foreignKey: "skateSpotId",
    });

    SkatePost.belongsTo(models.Skater, {
      as: "skater",
      foreignKey: "skaterId",
    });

    SkatePost.hasMany(models.SkatePostComment, {
      foreignKey: "skatePostId",
    });

    SkatePost.hasMany(models.LikedPost, {
      foreignKey: "postId",
    });
  };
  return SkatePost;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const SkatePost = sequelize.define('SkatePost', {
    post: {
      allowNull: false,
      type: DataTypes.STRING,
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
      type: DataTypes.STRING
    }
  }, {});
  SkatePost.associate = function (models) {
    SkatePost.belongsTo(models.SkatePost, {
      foreignKey: "skateSpotId"
    });

    SkatePost.belongsTo(models.Skater, {
      foreignKey: "skaterId"
    });
  };
  return SkatePost;
};

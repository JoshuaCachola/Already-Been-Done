'use strict';
module.exports = (sequelize, DataTypes) => {
  const SkatePostComment = sequelize.define('SkatePostComment', {
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    skatePostId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    skaterId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});

  SkatePostComment.associate = function(models) {
    SkatePostComment.belongsTo(models.SkatePost, {
      foreignKey: "skatePostId"
    });

    SkatePostComment.belongsTo(models.Skater, {
      foreignKey: "skaterId"
    });
  };
  return SkatePostComment;
};
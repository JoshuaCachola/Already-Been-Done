"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Skater = sequelize.define(
    "Skater",
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
      },
      accountPhoto: {
        type: DataTypes.STRING(255),
      },
      phoneNumber: {
        type: DataTypes.STRING(50),
      },
    },
    {}
  );

  Skater.associate = function (models) {
    Skater.hasMany(models.SkatePost, {
      as: "skater",
      foreignKey: "skaterId",
    });

    Skater.hasMany(models.SkatePostComment, {
      as: "skaterCommenter",
      foreignKey: "skaterId",
    });

    Skater.hasMany(models.SkateCrewSkater, {
      foreignKey: "skaterId",
    });

    Skater.hasMany(models.SkateSpotFollowing, {
      foreignKey: "skaterId",
    });

    Skater.hasMany(models.SkatePost, {
      foreignKey: "skaterId",
    });

    Skater.hasMany(models.ChatRoomSkater, {
      foreignKey: "skaterId",
    });
  };

  Skater.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return Skater;
};

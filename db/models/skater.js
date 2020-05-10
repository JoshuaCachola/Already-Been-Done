'use strict';

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Skater = sequelize.define('Skater', {
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
      type: DataTypes.STRING(100)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
    },
    // crewId: {
    //   type: DataTypes.INTEGER,
    // },
    phoneNumber: {
      type: DataTypes.STRING(50),
    }
  }, {});
  Skater.associate = function (models) {

  };

  Skater.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return Skater;
};

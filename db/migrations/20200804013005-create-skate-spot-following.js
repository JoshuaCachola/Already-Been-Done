"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SkateSpotFollowings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      skaterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Skaters" },
      },
      skateSpotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "SkateSpots" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SkateSpotFollowings");
  },
};

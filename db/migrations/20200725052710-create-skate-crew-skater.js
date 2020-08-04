"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SkateCrewSkaters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      skaterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Skaters" },
      },
      skateCrewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "SkateCrews" },
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
    return queryInterface.dropTable("SkateCrewSkaters");
  },
};

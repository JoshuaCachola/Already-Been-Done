"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ChatRoomSkaters", {
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
      chatRoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ChatRooms" },
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
    return queryInterface.dropTable("ChatRoomSkaters");
  },
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const ChatRoomSkater = sequelize.define(
    "ChatRoomSkater",
    {
      skaterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chatRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  ChatRoomSkater.associate = function (models) {
    ChatRoomSkater.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
    });

    ChatRoomSkater.belongsTo(models.Skater, {
      foreignKey: "skaterId",
    });
  };
  return ChatRoomSkater;
};

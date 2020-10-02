"use strict";
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    "ChatRoom",
    {
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {}
  );
  ChatRoom.associate = function (models) {
    ChatRoom.hasMany(models.ChatMessage, {
      foreignKey: "chatRoomId",
      sourceKey: "id",
    });
    ChatRoom.hasMany(models.ChatRoomSkater, {
      foreignKey: "chatRoomId",
    });
  };
  return ChatRoom;
};

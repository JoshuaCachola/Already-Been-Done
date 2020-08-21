"use strict";
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    "ChatMessage",
    {
      chatRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );
  ChatMessage.associate = function (models) {
    ChatMessage.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
      targetKey: "id",
    });
  };
  return ChatMessage;
};

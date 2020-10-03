const express = require("express");
const { ChatRoom, ChatMessage } = require("../../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../auth");
const router = express.Router();

/**
 * Route - /api/v1/chat
 *    GET - get all chatrooms
 * 		POST - create a chat room
 */
router
  .route("/")
  .get(
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const chatRooms = await ChatRoom.findAll();
      res.send(chatRooms);
    })
  )
  .post(
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const room = req.body.room;
      const chatRooms = await ChatRoom.findAll({
        where: { name: room },
      });

      const chatRoom = chatRooms[0];
      if (!chatRoom) {
        await ChatRoom.create({ name: room });
      }
      res.send(chatRooms);
    })
  );

/**
 * Route - /api/v1/chat/messages/:chatRoomName
 *    GET - get messages from chat room
 */
router.get(
  "/messages/:chatRoomName",
  requireAuth,
  asyncHandler(async (req, res) => {
    const chatRoomName = req.params.chatRoomName;
    const chatRooms = await ChatRoom.findAll({
      where: { name: chatRoomName },
    });

    const chatRoomId = chatRooms[0].id;
    const messages = await ChatMessage.findAll({
      where: {
        chatRoomId,
      },
    });
    res.json(messages);
  })
);

module.exports = router;

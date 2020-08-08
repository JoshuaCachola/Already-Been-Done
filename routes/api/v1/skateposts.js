const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../auth");
const { SkatePost, LikedPost } = require("../../../db/models");
const router = express.Router();

/**
 * Route - /api/v1/skateposts/:postid/boardtap
 *    POST - board tap (like) a post
 */
router.post(
  "/:postid/boardtap",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const postId = parseInt(req.params.postid, 10);
    const boardTap = await LikedPost.create({
      skaterId,
      postId,
    });

    SkatePost.increment("boardTaps", { by: 1, where: { id: postId } });

    res.status(201).json(boardTap);
  })
);

/**
 * Route - /api/v1/skateposts/:postid/boardtap
 *   	DELETE - remove board tap (like) from a post
 */
router.delete(
  "/:postid/boardtap",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const postId = parseInt(req.params.postid, 10);
    await LikedPost.destroy({
      where: {
        skaterId,
        postId,
      },
    });

    SkatePost.decrement("boardTaps", { by: 1, where: { id: postId } });

    res.status(201).json({ delete: true });
  })
);

module.exports = router;

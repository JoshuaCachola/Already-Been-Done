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

/**
 * Route - /api/v1/skateposts/:postid/boardtap
 *    GET - get all board tapped posts
 */
router.get(
  "/:postid(\\d+)/boardtap",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const postId = parseInt(req.params.postid, 10);
    const postBoardTap = await LikedPost.findOne({
      where: {
        skaterId,
        postId,
      },
    });

    let found = postBoardTap ? true : false;
    res.json({ tapped: found });
  })
);

/**
 * Route - /api/v1/skateposts/boardtaps
 *    GET - get all board tapped posts
 */
router.get(
  "/boardtaps",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const boardTappedPosts = await LikedPost.findAll({
      where: {
        skaterId,
      },
    });

    res.json(boardTappedPosts);
  })
);

/**
 * Route - /api/v1/skateposts
 *    GET - get all skateposts for specific skater
 */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const skatePosts = await SkatePost.findAll({
      where: {
        skaterId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(skatePosts);
  })
);

module.exports = router;

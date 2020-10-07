const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../auth");
const {
  SkatePost,
  LikedPost,
  SkatePostComment,
  Skater,
} = require("../../../db/models");
const { fn } = require("sequelize");
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
 * Route - /api/v1/skateposts/my-posts
 *    GET - get all skateposts for specific skater
 */
router.get(
  "/my-posts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const posts = await SkatePost.findAll({
      where: {
        skaterId,
      },
      include: [
        {
          model: Skater,
          as: "skater",
          attributes: ["firstName", "lastName", "username", "accountPhoto"],
        },
        {
          model: LikedPost,
          attributes: [[fn("COUNT", "*"), "likeCount"]],
        },
        {
          model: SkatePostComment,
          attributes: [[fn("COUNT", "*"), "commentCount"]],
        },
      ],
      group: [
        "SkatePost.id",
        "skater.id",
        "LikedPosts.id",
        "SkatePostComments.id",
      ],
    });

    res.json(posts);
  })
);

/**
 * Route - /api/v1/skateposts/:skatePostId/comments-and-likes-count
 *    GET - get count of comments and likes for skate post
 */
router.get(
  "/:skatePostId(\\d+)/comments-and-likes-count",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skatePostId = parseInt(req.params.skatePostId, 10);

    const commentsCount = await SkatePostComment.count({
      where: {
        skatePostId,
      },
    });

    const likedPostCount = await LikedPost.count({
      where: { postId: skatePostId },
    });

    res.json({ commentsCount, likedPostCount });
  })
);

module.exports = router;

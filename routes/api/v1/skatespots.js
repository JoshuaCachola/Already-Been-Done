const express = require("express");
const asyncHandler = require("express-async-handler");
const { fn, col, where, literal } = require("sequelize");
const { requireAuth } = require("../../../auth");
const {
  SkateSpot,
  SkatePost,
  Skater,
  SkatePostComment,
  SkateSpotFollowing,
  LikedPost,
} = require("../../../db/models");
const { uploadPicture } = require("../../../services/file-upload");
const { uploadVideo } = require("../../../services/file-upload");
const router = express.Router();

const singleUploadPicture = uploadPicture.single("image");
const singleUploadVideo = uploadVideo.single("video");

/**
 *  Route - /api/v1/skatespots
 *    GET Endpoint
 *      - gets a list of all skate spots
 *    POST Endpoint
 *      - creates a new skate spot
 */
router
  .route("/")
  .get(
    requireAuth,
    asyncHandler(async (_, res) => {
      const skateSpots = await SkateSpot.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.json({ skateSpots });
    })
  )
  .post(
    requireAuth,
    asyncHandler(async (req, res) => {
      const { name, city, state, address, imgs } = req.body;

      const skateSpot = await SkateSpot.create({
        name,
        city,
        state,
        address,
        imgs,
        following: 0,
      });

      res.status(201).json({ skateSpot });
    })
  );

/**
 *  Route - /api/v1/skatespots/:id
 *    GET - get details of a skate spot
 */
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skateSpotDetails = await SkateSpot.findByPk(req.params.id, {
      include: [
        {
          model: SkateClip,
        },
      ],
    });

    res.json(skateSpotDetails);
  })
);

/**
 *  Route - api/v1/skatespots/:id/upload-picture
 *  POST - upload photo to AWS S3 bucket
 */
router.post(
  // change to id
  // need authentication
  "/upload-image",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    singleUploadPicture(req, res, (err) => {
      if (err) {
        // return res
        //   .status(422)
        //   .send({
        //     errors: [{ title: "Image Upload Error", detail: err.message }],
        //   });
        next(err);
      }
      return res.json({ postUrl: req.file.location });
    });
  })
);

/**
 *  Route - api/v1/skatespots/:id/upload-video
 *  Post - upload video to AWS S3 bucket
 */
router.post(
  // change to id
  // need authentication
  "/upload-video",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    singleUploadVideo(req, res, (err) => {
      if (err) {
        // return res
        //   .status(422)
        //   .send({
        //     errors: [{ title: "Image Upload Error", detail: err.message }],
        //   });
        next(err);
      }
      return res.json({ postUrl: req.file.location });
    });
  })
);

/**
 *  ROUTE - /api/v1/skatespots/:id/posts
 *    GET
 *      - Gets all the posts for the skate spot
 *    POST
 *      - Creates a new list for the skate spot
 */
router
  .route("/:id(\\d+)/posts")
  .get(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skateSpotId = parseInt(req.params.id, 10);
      const posts = await SkatePost.findAll({
        // attributes: Object.keys(SkatePost.attributes).concat([
        //   [
        //     literal(
        //       `(SELECT COUNT("LikedPost"."id") FROM "LikedPost" WHERE "LikedPost"."postId" = ${skateSpotId})`
        //     ),
        //     "likeCount",
        //   ],
        // ]),
        where: {
          skateSpotId,
        },
        include: [
          {
            model: Skater,
            as: "skater",
            attributes: ["firstName", "lastName", "username", "accountPhoto"],
          },
          {
            model: LikedPost,
            attributes: [
              [
                literal(
                  `(SELECT COUNT(*) FROM "LikedPosts" WHERE "LikedPosts"."postId" = ${skateSpotId})`
                ),
                "likeCount",
              ],
            ],
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
  )
  .post(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skateSpotId = parseInt(req.params.id, 10);
      const { post, caption } = req.body;

      const skatePost = await SkatePost.create({
        post,
        caption,
        skaterId: req.skater.id,
        skateSpotId,
      });

      res.status(201).json(skatePost);
    })
  );

/**
 *  Route - /api/v1/skatespots/:skatespotid/posts/:skatepostid/comments
 *    GET - get comments for post
 *    POST - post comments for
 */
router
  .route("/:skatespotid(\\d+)/posts/:skatepostid(\\d+)/comments")
  .get(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skatePostId = parseInt(req.params.skatepostid, 10);
      const comments = await SkatePostComment.findAll({
        where: {
          skatePostId,
        },
        include: [
          {
            model: Skater,
            as: "skaterCommenter",
            attributes: ["username", "accountPhoto"],
          },
        ],
      });

      res.json(comments);
    })
  )
  .post(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skatePostId = parseInt(req.params.skatepostid, 10);
      const skaterId = req.skater.id;
      const { comment } = req.body;

      const postComment = await SkatePostComment.create({
        comment,
        skatePostId,
        skaterId,
      });

      res.status(201).json(postComment);
    })
  );

/**
 *  Route - /api/v1/skatespots/:skatespotid/follow
 *    POST - follow skate spot
 */
router.post(
  "/:skatespotid(\\d+)/follow",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const skateSpotId = parseInt(req.params.skatespotid, 10);
    const followSkateSpot = await SkateSpotFollowing.create({
      skaterId,
      skateSpotId,
    });
    SkateSpot.increment("following", { by: 1, where: { id: skateSpotId } });
    res.status(201).json(followSkateSpot);
  })
);

/**
 *  Route - /api/v1/skatespots/:skatespotid/unfollow
 *    DELETE - unfollow skate spot
 */
router.delete(
  "/:skatespotid(\\d+)/unfollow",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skateSpotId = parseInt(req.params.skatespotid, 10);
    const skaterId = req.skater.id;
    await SkateSpotFollowing.destroy({
      where: { skateSpotId, skaterId },
    });

    SkateSpot.decrement("following", { by: 1, where: { id: skateSpotId } });
    res.status(201).json({ delete: true });
  })
);

/**
 * Route - /api/v1/skatespots/following
 *    GET - get list of followed skate spots
 */
router.get(
  "/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const followedSkateSpots = await SkateSpotFollowing.findAll({
      where: {
        skaterId,
      },
    });

    res.json(followedSkateSpots);
  })
);

/**
 * Route - /api/v1/skatespots/:skatespotid/followingspot
 *    GET - get list of followed skate spots
 */
router.get(
  "/:skatespotid(\\d+)/following-spot",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const skateSpotId = parseInt(req.params.skatespotid, 10);
    const followedSkateSpot = await SkateSpotFollowing.findOne({
      where: {
        skaterId,
        skateSpotId,
      },
    });

    if (followedSkateSpot) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  })
);

/**
 * Route - /api/v1/skatespots/:skatespotid/following
 *    GET - get list of posts and comments from followed skatespots
 */
router.get(
  "/:skatespotid(\\d+)/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skateSpotId = parseInt(req.params.skatespotid, 10);
    const skateSpotPosts = await SkatePost.findAll({
      where: {
        skateSpotId,
      },
      include: [
        {
          model: SkatePostComment,
          include: [
            {
              model: Skater,
              as: "skaterCommenter",
            },
          ],
        },
        {
          model: Skater,
          as: "skater",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(skateSpotPosts);
  })
);

/**
 * Router - /api/v1/skatespots/followed-spots-count
 *    Get - get the amount of followed skatespots for a skater
 */
router.get(
  "/followed-spots-count",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skaterId = req.skater.id;
    const count = await SkateSpotFollowing.count({
      where: {
        skaterId,
      },
      distinct: true,
      col: "id",
    });

    res.json({ count });
  })
);

module.exports = router;

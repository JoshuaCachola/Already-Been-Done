const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../auth");
const { SkateSpot, SkatePost } = require("../../../db/models");
const upload = require("../../../services/file-upload");

const router = express.Router();
const singleUpload = upload.single("image");

/**
 *  Route - /api/v1/skatespots
 *    GET Endpoint 
 *      - gets a list of all skate spots
 *    POST Endpoint
 *      - creates a new skate spot
 */
router.route("/")
  .get(
  requireAuth,
  asyncHandler(async (_, res) => {
    const skateSpots = await SkateSpot.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json({ skateSpots });
  }))
  .post(
  requireAuth,
  asyncHandler(async (req, res) => {
    const { 
      name,
      city,
      state,
      address,
      imgs
    } = req.body;

    console.log(name, city, state, imgs)
    const skateSpot = await SkateSpot.create({
      name,
      city, 
      state,
      address,
      imgs
    });

    res.status(201).json({ skateSpot })
  })
);

/**
 *  ROUTE - /api/v1/skatespots/:id
 *    GET - get details of a skate spot
 */
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const skateSpotDetails = await SkateSpot.findByPk(
      req.params.id, {
        include: [{
          model: SkateClip
        }]
      });

    res.json(skateSpotDetails);
  })
);

/**
 *  POST Endpoint - api/v1/skatespots/:id/upload
 */
router.post(
  // change to id
  // need authentication
  "/upload",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    singleUpload(req, res, (err) => {
      console.log(req);
      if (err) {
        // return res
        //   .status(422)
        //   .send({
        //     errors: [{ title: "Image Upload Error", detail: err.message }],
        //   });
        next(err);
      }
      return res.json({ "imageUrl": req.file.location });
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
router.route("/:id(\\d+)/posts")
  .get(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skateSpotId = parseInt(req.params.id, 10);
      const posts = await SkatePost.findAll({
        where: {
          skateSpotId
        }
      });
      console.log(posts);
      res.json(posts);
    })
  ).post(
    requireAuth,
    asyncHandler(async (req, res) => {
      const skateSpotId = parseInt(req.params.id, 10);
      const {
        post,
        caption
      } = req.body;

      const skatePost = await SkatePost.create({
        post,
        caption,
        skaterId: req.skater.id,
        skateSpotId
      });

      res.status(201).json(skatePost)
    })
  );

module.exports = router;

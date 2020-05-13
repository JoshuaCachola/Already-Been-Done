const express = require("express");
const asyncHandler = require("express-async-handler");
const aws = require("aws-sdk");
const { requireAuth } = require("../../../auth");
const { SkateSpot, SkateClip } = require("../../../db/models");
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

// /**
//  *  POST Endpoint - /skatespots/:id/clips
//  */
// router.post(
//   "/:id/clips",
//   asyncHandler(async (req, res, next) => {
//     const {
//       clipPath,
//       clipName,
//       clipCaption,
//       skaterId
//     } = req.body;
//     const id = parseInt(req.params.id, 10);

//     // **** may need csrfProtection

//     const clip = {
//       clipPath,
//       clipName,
//       clipCaption,
//       skaterId
//     };

//     const skateClip = await SkateClips.create(clip);

//     res.status(201).json({ skateClip });
//   })
// );

/**
 *  POST Endpoint - api/v1/skatespots/:id/upload
 */
router.post(
  // change to id
  // need authentication
  "/upload",
  (req, res) => {
    singleUpload(req, res, (err) => {
      console.log(req);
      if (err) {
        return res
          .status(422)
          .send({
            errors: [{ title: "Image Upload Error", detail: err.message }],
          });
      }
      return res.json({ "imageUrl": req.file.location });
    });
  }
);

// router.get(
//   "/sign-s3",
//   (req, res) => {
//     const s3 = new aws.S3();
//     const fileName = req.query["file-name"];
//     const fileType = req.query["file-type"];
//     const s3Params = {
//       Bucket: "abd-bucket-dev",
//       Key: fileName,
//       expires: 60,
//       ContentType: fileType,
//       ACL: "public-read"
//     };

//     s3.getSignedUrl("putObject", s3Params, (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.end();
//       }

//       const returnData = {
//         signedRequest: data,
//         url: `https://${s3Params.Bucket}.s3-us-west-1.amazonaws.com/${fileName}`
//       };
//       res.json(returnData);
//     })
//   }
// );

module.exports = router;

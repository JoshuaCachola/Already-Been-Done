const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../auth");
const { SkateSpot, SkateClips } = require("../../../db/models");
const upload = require("../../../services/file-upload");
// console.log(upload);
const router = express.Router();

const singleUpload = upload.single("image");

// const uploadFile = (source, targetName, res) => {
//   console.log("preparing to upload...");
//   fs.readFile(source, (err, fileData) => {
//     if (!err) {
//       const putParams = {
//         Bucket: "abdbucket",
//         Key: "",
//         Body: fileData
//       };

//       s3.putObject(putParams, (err, data) => {
//         if (err) {
//           console.log(`Could not upload the file. Error: ${err}`);
//           return res.send({ success: false });
//         } else {
//           fs.unlink
//         }
//       });
//     }
//   });
// };
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

      console.log(name, city, state, img)
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

module.exports = router;

const express = require("express");
const asyncHandler = require("express-async-handler");
const { SkateSpots, SkateClips } = require("../../db/models");
const upload = require("../../services/file-upload");
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
 *  GET Endpoint - /skatespots
 */
// router.get(
//   "/",
//   asyncHandler(async (_, res, next) => {
//     const skateSpots = await SkateSpots.findAll();

//     // skate spot validation

//     res.json({ skateSpots });
//   })
// );

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
 *  POST Endpoint - /skatespots/:id/upload
 */
router.post(
  // change to id
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
      console.log(req);
      return res.json({ "imageUrl": req.file });
    });
  }
);

module.exports = router;

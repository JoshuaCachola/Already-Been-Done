const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const { SkateSpots, SkateClips } = require("../../db/models");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

AWS.config.update({
  accessKeyId: process.env.IAM_ACCESS_KEY,
  secretAccessKey: process.env.IAM_SECRET,
  region: "us-west-1"
});

const s3 = new AWS.S3();

const uploadFile = (source, targetName, res) => {
  console.log("preparing to upload...");
  fs.readFile(source, (err, fileData) => {
    if (!err) {
      const putParams = {
        Bucket: "abdbucket",
        Key: "",
        Body: fileData
      };

      s3.putObject(putParams, (err, data) => {
        if (err) {
          console.log(`Could not upload the file. Error: ${err}`);
          return res.send({ success: false });
        } else {
          fs.unlink
        }
      });
    }
  });
};
/**
 *  GET Endpoint - /skatespots
 */
router.get(
  "/",
  asyncHandler(async (_, res, next) => {
    const skateSpots = await SkateSpots.findAll();

    // skate spot validation

    res.json({ skateSpots });
  })
);

/**
 *  POST Endpoint - /skatespots/:id/clips
 */
router.post(
  "/:id/clips",
  asyncHandler(async (req, res, next) => {
    const {
      clipPath,
      clipName,
      clipCaption,
      skaterId
    } = req.body;
    const id = parseInt(req.params.id, 10);

    // **** may need csrfProtection

    const clip = {
      clipPath,
      clipName,
      clipCaption,
      skaterId
    };

    const skateClip = await SkateClips.create(clip);

    res.status(201).json({ skateClip });
  })
);

/**
 *  POST Endpoint - /skatespots/:id/upload
 */
router.post(
  "/skatespots/:id/upload",
  upload.single("demo_file"),
  asyncHandler(async (req, res) => {
    uploadFile(req.file.path, req.file.filename, res);
  })
)

module.exports = router;

const express = require("express");
const { requireAuth } = require("../../../auth");
const { uploadPicture } = require("../../../services/file-upload");
const { uploadVideo } = require("../../../services/file-upload");
const router = express.Router();

const singleUploadPicture = uploadPicture.single("image");
const singleUploadVideo = uploadVideo.single("video");

/**
 *  Route - api/v1/media/upload-picture
 *  POST - upload photo to AWS S3 bucket
 */
router.post("/upload-image", requireAuth, (req, res, next) => {
  singleUploadPicture(req, res, (err) => {
    if (err) {
      next(err);
    }
    return res.json({ postUrl: req.file.location });
  });
});

/**
 *  Route - api/v1/media/upload-video
 *  Post - upload video to AWS S3 bucket
 */
router.post("/upload-video", requireAuth, (req, res, next) => {
  singleUploadVideo(req, res, (err) => {
    if (err) {
      next(err);
    }
    return res.json({ postUrl: req.file.location });
  });
});

module.exports = router;

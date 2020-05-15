const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.IAM_SECRET,
  accessKeyId: process.env.IAM_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      console.log("req*************", req);
      console.log("file------------------", file);
      cb(null, {fieldName: "TESTING_METADATA"});
    },
    key: (req, file, cb) => {
      console.log("req*************", req);
      console.log("file------------------", file);
      cb(null, `${Date.now().toString()}.mp4`)
    },
  })
});

module.exports = upload;
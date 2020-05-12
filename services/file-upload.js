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
    bucket: "abd-bucket-dev",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, {fieldName: "TESTING_METADATA"});
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
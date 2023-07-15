require('dotenv').config();
const userModel = require('../models/userModel');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3_instance = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});

module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    let allUsers = await userModel.find();
    if (allUsers) {
      res.json({
        user: allUsers,
      });
    } else {
      res.json({
        message: 'no users found',
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3: s3_instance,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image${Date.now()}.jpeg`);
      },
    }),
  });

module.exports.saveProfilePicture = async function saveProfilePicture( req, res, next) {
  const uploadSingle = upload('profile-pictures-db').single('croppedImage');
  uploadSingle(req, res, async (err)=>{
    if(err){
      console.log(err.message);
      return res.status(400).json({success: false, message: err.message});
    }

    const curr_user = await userModel.findOne({email: req.body.email});
    await curr_user.updateOne({profilePictureURL: req.file.location});
    res.status(200).json({ data: req.file.location});
  });
};

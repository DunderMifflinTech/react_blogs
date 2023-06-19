const userModel = require('../models/userModel');

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

module.exports.saveProfilePicture = async function saveProfilePicture(req, res) {
  res.status(200).json({
    message: 'It works lol',
    body: req.files
  });
};

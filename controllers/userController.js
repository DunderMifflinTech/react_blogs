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

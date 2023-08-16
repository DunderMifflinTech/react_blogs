const express = require('express');
const userModel = require('../models/userModel');
const {
  getAllUsers,
  saveProfilePicture,
  getSelectedUsers,
} = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.route('/allusers').get(getAllUsers);

userRoutes.route('/selected-users').post(getSelectedUsers);

userRoutes.route('/save-profile-picture').post(saveProfilePicture);

module.exports = userRoutes;
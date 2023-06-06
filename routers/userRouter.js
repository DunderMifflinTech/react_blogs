const express = require('express');
const { getAllUsers, saveProfilePicture } = require('../controllers/userController');
const userModel = require('../models/userModel');

const userRoutes = express.Router();

userRoutes
    .route('/allusers')
    .get(getAllUsers);

userRoutes
    .route('/save-profile-picture')
    .post(saveProfilePicture);


module.exports = userRoutes;
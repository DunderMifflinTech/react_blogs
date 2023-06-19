const express = require('express');
const userModel = require('../models/userModel');
const { getAllUsers, saveProfilePicture } = require('../controllers/userController');

const userRoutes = express.Router();



userRoutes
    .route('/allusers')
    .get(getAllUsers);

userRoutes
    .route('/save-profile-picture')
    .post(saveProfilePicture);


module.exports = userRoutes;
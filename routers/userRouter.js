const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const userModel = require('../models/userModel');

const userRoutes = express.Router();

userRoutes
    .route('/allusers')
    .get(getAllUsers);


module.exports = userRoutes;
const { authUserLogin, authUserSignup } = require('../controllers/authController');
const express = require('express');
const authRoutes = express.Router();

authRoutes
    .route('/login')
    .post(authUserLogin);

authRoutes
    .route('/signup')
    .post(authUserSignup);

module.exports = authRoutes;
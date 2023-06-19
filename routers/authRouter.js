const {
  authUserLogin,
  authUserSignup,
  protectRoute,
} = require('../controllers/authController');
const express = require('express');
const authRoutes = express.Router();

authRoutes.route('/login').post(authUserLogin);

authRoutes.route('/signup').post(authUserSignup);

authRoutes.use(protectRoute);

authRoutes.route('/verify-authentication').get(protectRoute);

module.exports = authRoutes;

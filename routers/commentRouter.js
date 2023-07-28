const express = require('express');
const { createCommentByPost, getCommentsByPost } = require('../controllers/commentController');
const commentRouter = express.Router();

commentRouter.route('/post-comment').post(createCommentByPost);

commentRouter.route('/get-comments').get(getCommentsByPost);

module.exports = commentRouter;

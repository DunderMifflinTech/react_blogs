const postsModel = require('../models/postModel');
const userModel = require('../models/userModel');

module.exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await postsModel.find();
    res.status(200).json({
      data: allPosts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user._id);
    if (!user) res.status(400).json({ message: 'user does not exist' }); //400 === bad request
    try {
      newPost = {
        ownerId: user._id,
        body: req.body.body,
      };
      const createdPost = await postsModel.create(newPost);
      if (!createdPost)
        res
          .status(500)
          .json({ message: 'sowething went wrong, please try again later' });
      console.log(createdPost);
      res.redirect('/login');
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

module.exports.editPost = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user._id);
    const post = await postsModel.findById(req.body.post._id);

    if (
      !user ||
      !post ||
      JSON.stringify(user._id) !== JSON.stringify(post.ownerId)
    )
      res.status(400).json({ message: 'Bad request, data discrepancy' });

    const updatedPost = await postsModel.findOneAndUpdate(
      { _id: post._id },
      { body: req.body.body, editedAt: Date.now() },
      { new: true }
    );
    if (!updatedPost)
      res.status(500).json({
        message:
          'something went wrong while updating your post, please try again later',
      });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


//! Delete method to be fixed
module.exports.deletePost = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user._id);
    const post = await postsModel.findById(req.body.post._id);

    if (
      !user ||
      !post ||
      JSON.stringify(user._id) !== JSON.stringify(post.ownerId)
    )
      res.status(400).json({ message: 'Bad request, data discrepancy' });

    await postsModel.deleteById(post._id, (err) => {
      res.status(500).json({
        message: err,
      });
    });
    res.status(202).send(); // 202 means that the request has not been acted upon but will likely succeed
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

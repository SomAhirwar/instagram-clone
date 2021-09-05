const Posts = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");

exports.createPost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const post = await Posts.create({
    caption: req.body.caption,
    imageUrl: req.file.path,
    createdAt: Date.now(),
    user: req.user._id,
  });

  const resPost = await Posts.findById(post._id);
  // console.log(resPost);
  res.status(201).json({
    status: "success",
    data: {
      post: resPost,
    },
  });
};

exports.getAllPost = async (req, res) => {
  const posts = await Posts.find().sort("-createdAt");
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
};

exports.deletePost = async (req, res, next) => {
  const post = await Posts.findByIdAndDelete(req.params.id);

  if (!post) return next(new Error("Cannot find post"));

  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.getAllUserPost = async (req, res, next) => {
  try {
    const username = req.params.username;
    // console.log({ username });
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");
    const posts = await Posts.find({ user: user._id });

    res.status(200).json({
      status: "success",
      data: {
        user,
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

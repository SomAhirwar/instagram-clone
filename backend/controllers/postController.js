const Posts = require("../models/postModel");
const path = require("path");

exports.createPost = async (req, res) => {
  //console.log(req.body);
  //console.log(req.file);
  const post = await Posts.create({
    ...req.body,
    imageUrl: req.file.path,
    createdAt: Date.now(),
  });
  res.status(201).json({
    status: "success",
    data: {
      post,
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

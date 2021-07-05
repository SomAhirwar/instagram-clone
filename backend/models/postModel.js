const mongoose = require("mongoose");
const io = require("../server");

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: String,
  username: String,
  createdAt: Date,
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;

const express = require("express");
const postController = require("../controllers/postController");
const setUpUpload = require("../upload");
const upload = setUpUpload("./public/posts");

const router = express.Router();

router
  .route("/")
  .post(upload.single("imageUrl"), postController.createPost)
  .get(postController.getAllPost);

router.route("/:id").delete(postController.deletePost);

module.exports = router;

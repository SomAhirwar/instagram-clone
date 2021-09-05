const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const setUpUpload = require("../upload");
const upload = setUpUpload("./public/posts");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    upload.single("image"),
    postController.createPost
  )
  .get(authController.protect, postController.getAllPost);

router.route("/:id").delete(postController.deletePost);

module.exports = router;

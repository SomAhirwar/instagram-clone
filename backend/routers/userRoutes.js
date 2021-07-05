const express = require("express");
const userController = require("../controllers/userController");
const setUpUpload = require("../upload");
const upload = setUpUpload("./public/profileImg");

const router = express.Router();

router.route("/").post(upload.single("profileImg"), userController.createUser);

module.exports = router;

const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      profileImg: req.file.path,
      createdAt: Date.now(),
    });
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(403).json({
      satus: "failed",
      data: err,
    });
  }
};

const User = require("../models/userModel");
const mongoose = require("mongoose");

const getPopulatedUser = async (id) => {
  const userAgg = await User.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: "users",
        localField: "followers",
        foreignField: "_id",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "following",
      },
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        bio: 1,
        profileImg: 1,
        "followers._id": 1,
        "followers.username": 1,
        "followers.fullname": 1,
        "followers.profileImg": 1,
        "following._id": 1,
        "following.username": 1,
        "following.fullname": 1,
        "following.profileImg": 1,
      },
    },
  ]);

  return userAgg[0];
};

exports.getPopulatedUser = getPopulatedUser;

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      profileImg: req.file ? req.file.path : undefined,
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

exports.follow = async (req, res) => {
  const { follow } = req.body;
  try {
    if (!follow) {
      throw new Error(`Please provide follow`);
    }
    if (!req.user) throw new Error(`Please login again`);

    if (req.user.following.includes(follow))
      throw new Error("Already following");

    const followingResponse = await User.findByIdAndUpdate(
      follow,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );

    if (!followingResponse) throw new Error(`Object Id of follwing is wrong`);

    const userResponse = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: follow },
      },
      { new: true }
    );

    const userPopulated = await getPopulatedUser(req.user._id);
    const followPopulated = await getPopulatedUser(
      mongoose.Types.ObjectId(follow)
    );

    res.status(200).json({
      status: "success",
      data: {
        user: userPopulated,
        follow: followPopulated,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const { unfollow } = req.body;
    if (!unfollow) throw new Error(`Please provide unfollow id`);

    if (!req.user) throw new Error(`Please login again`);

    if (!req.user.following.includes(unfollow))
      throw new Error(`Cannot unfollow non-followed users`);

    const unfollowResponse = await User.findByIdAndUpdate(
      unfollow,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );

    if (!unfollowResponse) throw new Error(`Object Id of unfollow is wrong`);

    const userResponse = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: unfollow },
      },
      { new: true }
    );
    const userPopulated = await getPopulatedUser(req.user._id);
    const unfollowPopulated = await getPopulatedUser(
      mongoose.Types.ObjectId(unfollow)
    );

    res.status(200).json({
      status: "success",
      data: { user: userPopulated, unfollow: unfollowPopulated },
    });
  } catch (err) {
    res.status(400).json({
      status: " failed",
      message: err.message,
    });
  }
};

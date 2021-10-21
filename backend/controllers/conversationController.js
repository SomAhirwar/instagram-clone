const mongoose = require("mongoose");
const Conversations = require("../models/conversationModel");

exports.createConversation = async (req, res) => {
  const receiver = req.body.receiver;
  if (!receiver) throw new Error("Please provide Receiver feild");
  try {
    const conversation = await Conversations.create({
      members: [req.user._id, mongoose.Types.ObjectId(receiver)],
    });

    res.status(201).json({
      status: "success",
      data: {
        conversation,
      },
    });
  } catch (err) {
    res.status(400).josn({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getConversation = async (req, res) => {
  // console.log(req.user);
  try {
    const conversations = await Conversations.find({
      members: { $in: req.user._id },
    });
    res.status(201).json({
      status: "success",
      data: {
        conversations,
      },
    });
  } catch (err) {
    res.status(400).josn({
      status: "failed",
      message: err.message,
    });
  }
};

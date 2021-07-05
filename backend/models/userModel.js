const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your E-mail"],
    validate: [validator.isEmail, "Please Enter a valid E-mail"],
  },
  username: {
    type: String,
    required: [true, "Please Enter Your Username"],
    validate: {
      validator: function (val) {
        return !val.includes(" ");
      },
      message: "Username should not have space",
    },
  },
  bio: {
    type: String,
    maxlength: 150,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm your password"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Password confirm doesnot match",
    },
  },
  profileImg: String,
  createdAt: Date,
});

const User = mongoose.model("User", userSchema);

userSchema.path("email").validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return !emailCount;
}, "Email already exists");

userSchema.path("username").validate(async (value) => {
  const count = await mongoose.models.User.countDocuments({
    username: value,
  });
  return !count;
}, "Username already exists");

module.exports = User;

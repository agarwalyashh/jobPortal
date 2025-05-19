const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: (value) => {
      return validator.isEmail(value);
    },
    message: ["Email is not valid"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  resume: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

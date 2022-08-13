const mongoose = require("mongoose");
const { isEmail } = require("validator");

const passwordReset = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Valid Email Address"],
    unique: [true, " Account related to this Email is Already registered"],
    trim: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },
  userID: { type: String },
  resetToken: {
    type: String,
    required: [true, "Reset Token"],
  },
  createdAt: Date,
  expiresAt: Date,
});

const otpModel = mongoose.model("PasswordReset", passwordReset);

module.exports = otpModel;

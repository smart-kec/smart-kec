const mongoose = require("mongoose");
const { isEmail } = require("validator");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Valid Email Address"],
    unique: [true, " Account related to this Email is Already registered"],
    trim: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },
  otp: {
    type: String,
    required: [true, "Please Submit with OTP"],
  },
  createdAt: Date,
  expiresAt: Date,
});

const otpModel = mongoose.model("otpDetails", otpSchema);

module.exports = otpModel;

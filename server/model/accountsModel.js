const mongoose = require("mongoose");
const { isEmail } = require("validator");

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Valid Email Address"],
    unique: [true, " Account related to this Email is Already registered"],
    trim: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },

  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minLength: [6, "Minimum length of the password must be 8"],
  },

  type: {
    type: String,
    required: [
      true,
      "Required Type : Student/Staff/Dept/Labs/Halls/Organizers",
    ],
  },
});

const accountModel = mongoose.model("accounts", accountSchema);

module.exports = accountModel;

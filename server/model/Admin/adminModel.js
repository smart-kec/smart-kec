const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
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
  },
});

adminSchema.statics.login = async function (email, password, type) {
  const user = await this.findOne({ email, type });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  } else {
    if (type != "Admin") {
      throw Error("Sorry, Invalid user credentials");
    } else {
      throw Error("incorrect email");
    }
  }
};

const adminModel = new mongoose.model("admin", adminSchema);

module.exports = adminModel;

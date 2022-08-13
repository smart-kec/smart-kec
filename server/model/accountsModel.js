const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Valid Email Address"],
    unique: [true, " Account related to this Email is Already registered"],
    trim: true,
    lowercase: [true, "Email should be Lowercase"],
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

accountSchema.statics.login = async function (email, password, type) {
  const user = await this.findOne({ email, type });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  } else {
    if (type != "Student") {
      throw Error("choose your validType");
    } else {
      throw Error("incorrect email");
    }
  }
};

const accountModel = mongoose.model("accounts", accountSchema);

module.exports = accountModel;

const mongoose = require("mongoose");
const { isEmail } = require("validator");

const staffInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Staff must have a name"],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, "Select Designation"],
    trim: true,
  },
  idNo: {
    type: String,
    required: [true, "Enter your ID No"],
    trim: true,
    unique: [true, "Already registered with this id Number"],
  },
  qualification: {
    type: String,
    required: [true, "Enter the qualification details "],
  },
  gender: {
    type: String,
    required: [true, "Specify gender"],
  },
  department: {
    type: String,
    required: [true, "Required Department Staff or Office Staff"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Staff must have an email id"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },
  phoneNumber: {
    type: String,
    required: [true, "Staff must mention his/her phone number"],
  },
  classId: {
    type: String,
  },
  labID: {
    type: String,
  },
  pastClass: [String],
});

const staffInfoModel = new mongoose.model("staffinfo", staffInfoSchema);

module.exports = staffInfoModel;

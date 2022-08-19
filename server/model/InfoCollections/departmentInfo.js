const mongoose = require("mongoose");
const { isEmail } = require("validator");

const yearInchargeSchema = new mongoose.Schema({
  year: {
    type: Number,
    unique: [true, "Only one year incharge for one year"],
  },
  yearInchargeEmail: {
    type: String,
    trim: true,
    required: [true, "Required department EMail Id"],
    lowercase: [true, "Email should be Lowercase"],
    validate: [isEmail, "Please, enter a valid email "],
  },
});
const departmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Must mention department name"],
  },
  aliasName: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Must mention department name"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Required department EMail Id"],
    lowercase: [true, "Email should be Lowercase"],
    validate: [isEmail, "Please, enter a valid email "],
  },
  noOfSemesters: {
    type: Number,
    required: [true, "Mention Number of Semesters"],
  },
  courseDuration: {
    type: Number,
    required: [true, "Specify the course Duration"],
  },
  establishedYear: {
    type: Number,
    required: [true, "Mention the year the department has started"],
  },
  hodEmail: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Required Hod EMail Id"],
    lowercase: [true, "Email should be Lowercase"],
    validate: [isEmail, "Please, enter a valid email "],
  },
  facultyCount: {
    type: Number,
    default: 0,
  },
  studentsCount: {
    type: Number,
    default: 0,
  },
  yearIncharge: {
    type: [yearInchargeSchema],
  },
});

const departmentModel = new mongoose.model("departments", departmentSchema);

module.exports = departmentModel;

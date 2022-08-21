const mongoose = require("mongoose");
const { isEmail } = require("validator");

const yearInchargeSchema = new mongoose.Schema({
  year: {
    type: Number,
    unique: [true, "Only one year incharge for one year"],
    required: [true, "Specify the year"],
  },
  yearInchargeId: {
    type: String,
    trim: true,
    required: [true, "Required Year Incharge Id"],
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
  programme: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Must mention Programme "],
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
  hodId: {
    type: String,
    unique: true,
    trim: true,
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
  classKeys: [String],
  endedClassKeys: [String],
});

const departmentModel = new mongoose.model("departments", departmentSchema);

module.exports = departmentModel;

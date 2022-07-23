const mongoose = require("mongoose");

const studentInfoSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, "A student must have a name"],
  },
  studentRollNo: {
    type: String,
    required: [true, "A student must have a roll number"],
    unique: true,
  },
  _id: {
    type: String,
    required: [true, "Id must be a roll number"],
    unique: true,
  },
  studentProgramme: {
    type: String,
    required: [true, "A student must be in a programme"],
  },
  studentBranch: {
    type: String,
    required: [true, "Student must study in any one of the branches"],
  },
  studentSection: {
    type: String,
  },
  studentYearOfStudy: {
    type: Number,
    required: [true, "Student must mention his year of study"],
  },
  studentEmail: {
    type: String,
    required: [true, "Student must have an Email id"],
    unique: true,
  },
  studentPhoneNumber: {
    type: String,
    required: [true, "Student must mention mobile number for contact"],
  },
  hackerRankId: {
    type: String,
    required: [true, "Must mention hacker rank id for Coding Contests"],
    unique: true,
  },
  notifyMe: {
    type: Boolean,
    required: [true, "Notification on/ off - Must be mentioned"],
  },
  studentRegisteredEvents: {
    type: [String],
    default: [],
  },
});

const studentInfoModel = mongoose.model("studentinfo", studentInfoSchema);

module.exports = studentInfoModel;

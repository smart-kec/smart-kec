const mongoose = require("mongoose");

const eventStatusSchema = new mongoose.Schema({
  eventKeys: {
    type: [String],
    default: [],
  },
  eventStatus: {
    type: String,
    default: "registered",
  },
});

const registeredEventsSchema = new mongoose.Schema({
  events: [eventStatusSchema],
  semesterNo: {
    type: Number,
    default: 1,
  },
});

const studentInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A student must have a name"],
  },
  rollNo: {
    type: String,
    required: [true, "A student must have a roll number"],
    unique: [true, "Rollnumber must be unique"],
  },
  dob: {
    type: Date,
    required: [true, "DoB required"],
  },
  programme: {
    type: String,
    required: [true, "A student must be in a programme"],
  },
  branch: {
    type: String,
    required: [true, "Student must study in any one of the branches"],
  },
  section: {
    type: String,
    default: "Not Assigned",
  },
  semesterNo: {
    type: Number,
    default: 1,
  },
  yearOfStudy: {
    type: Number,
    required: [true, "Student must mention his year of study"],
  },
  gender: {
    type: String,
    required: [true, "Mention Gender"],
  },
  graduationYear: {
    type: Number,
    required: [true, "Student must mention graduation year"],
  },
  email: {
    type: String,
    required: [true, "Student must have an Email id"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Student must mention mobile number for contact"],
  },
  hackerRankId: {
    type: String,
    required: [true, "Must mention hacker rank id for Coding Contests"],
    unique: true,
  },
  registeredEvents: [registeredEventsSchema],
  classKey: String,
});

const studentInfoModel = mongoose.model("studentinfos", studentInfoSchema);

module.exports = studentInfoModel;

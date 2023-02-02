const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
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
    required: [false, "DoB required"],
  },
  programme: {
    type: String,
    required: [true, "A student must be in a programme"],
  },

  deptId: {
    type: ObjectIdSchema,
    required: [true, "Dept id missing"],
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
  stayIn: {
    type: String,
    required: [true, "Mention StayIn"],
  },
  fatherName: {
    type: String,
    required: [true, "Father Name Required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name Required"],
  },
  fatherPhnNumber: {
    type: String,
    required: [true, "Student must mention Father mobile number for contact"],
  },
  motherPhnNumber: {
    type: String,
    required: [true, "Student must mention Mother mobile number for contact"],
  },
  hostelId: {
    type: ObjectIdSchema,
    required: [false, "Hostel id missing"],
  },
  registeredEvents: [registeredEventsSchema],
  classKey: ObjectIdSchema,
});

const studentInfoModel = mongoose.model("studentinfos", studentInfoSchema);

module.exports = studentInfoModel;

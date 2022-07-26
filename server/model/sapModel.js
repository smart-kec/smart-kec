const mongoose = require("mongoose");

const sapEvents = new mongoose.Schema({
  eventCategory: {
    type: String,
    required: [true, "Required Event Category"],
  },
  eventSubCategory: {
    type: String,
    required: [true, "Required Event Sub Category"],
  },
  eventName: {
    type: String,
    required: [true, "SAP Event name required"],
  },
  eventDate: {
    type: Date,
    required: [true, "Event Date required for SAP"],
  },
  clgName: {
    type: String,
    required: [true, "College NAme required"],
  },
  clgDeptName: {
    type: String,
    required: [true, "Required college dept name"],
  },
  mark: {
    type: Number,
  },
  status: {
    type: String,
    required: [true, "Status Required accept or reject ot aborted or pending"],
  },
});

const semesterSchema = new mongoose.Schema({
  studentRollNo: {
    type: String,
    unique: true,
    required: [true, "Roll number Must"],
  },
  sapEvents: [sapEventsSchema],
});

const sapSchema = new mongoose.Schema({
  class: {
    type: String,
    unique: true,
    required: [true, "Required Class Name"],
  },

  semesters: [semesterSchema],
});

const sapModel = new mongoose.model("sap", sapSchema);

module.exports = sapModel;

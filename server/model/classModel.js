import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema({
  markAdvisorKey: {
    type: String,
  },
  attendenceAdvisorKey: {
    type: String,
  },
  eventsAdvisorKey: {
    type: String,
  },
});

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Class must have an unique name"],
  },
  studentsKeys: [String],

  advisors: advisorSchema,

  classGroupMailId: {
    type: String,
    unique: true,
    required: [true, "Class Google groups mail id required"],
  },

  currentSemester: {
    type: Number,
  },

  regulation: {
    type: Number,
  },
});

const classModel = new mongoose.model("class", classSchema);

module.exports = classModel;

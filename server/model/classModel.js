import mongoose from "mongoose";
const { isEmail } = require("validator");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Class must have an unique name"],
  },
  aliasName: {
    type: "String",
  },
  studentsKeys: [String],

  advisorKeys: [String],

  classGroupMailId: {
    type: String,
    unique: true,
    required: [true, "Class Google groups mail id required"],
    lowercase: [true, "Email should be Lowercase"],
    validate: [isEmail, "Please, enter a valid email "],
  },

  currentSemester: {
    type: Number,
    required: [true, "Choose Semester Number"],

  },

  graduationYear: {
    type: Number,
    required: [true, "Choose Graduation Year"],
  },

  regulation: {
    type: Number,
    required: [true, "Mention Regulations"],

  },

  boysRep: String,
  girlsRep: String,

  status: {
    type: String,
    default: "ongoing",
  },
});

const classModel = new mongoose.model("class", classSchema);

module.exports = classModel;

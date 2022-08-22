const mongoose = require("mongoose");
const { isEmail } = require("validator");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    unique: [true, "Class must have an unique name"],
    trim: true,
    required: [true, "Class must have an name"],
  },
  aliasName: {
    type: "String",
    required: [true, "Class must have an common name"],
  },
  studentsKeys: [String],

  advisorKeys: {
    type: [String],
    required: [true, "Please, Choose Advisors"],
  },
  pastAdvisorKeys: {
    type: [String],
    required: [true, "Please, Choose Advisors"],
  },
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

const classModel = new mongoose.model("classes", classSchema);

module.exports = classModel;

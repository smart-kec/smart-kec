const mongoose = require("mongoose");
const { isEmail } = require("validator");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;

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
  section: {
    type: "String",
    required: [true, "Class must have a section"],
  },
  studentsKeys: [ObjectIdSchema],

  advisorKeys: {
    type: [ObjectIdSchema],
    required: [true, "Please, Choose Advisors"],
  },
  pastAdvisorKeys: {
    type: [ObjectIdSchema],
    required: [true, "Please, Choose Advisors"],
  },
  classGroupMailId: {
    type: String,
    unique: true,
    required: [true, "Class Google groups mail id required"],
    lowercase: [true, "Email should be Lowercase"],
    validate: [isEmail, "Please, enter a valid email "],
  },
  deptId: {
    type: ObjectIdSchema,
    required: [true, "Dept id required"],
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

  boysRep: ObjectIdSchema,
  girlsRep: ObjectIdSchema,

  status: {
    type: String,
    default: "ongoing",
  },
});

const classModel = new mongoose.model("classes", classSchema);

module.exports = classModel;

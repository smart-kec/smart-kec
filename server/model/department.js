import mongoose from "mongoose";

const yearInchargeSchema = new mongoose.Schema({
  year: {
    type: String,
  },
  yearInchargeKey: String,
});
const departmentSchema = new mongoose.Schema({
  deptName: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Must mention department name"],
  },
  deptEmailID: {
    type: true,
    unique: true,
    trim: true,
    required: [true, "Required department EMail Id"],
  },
  noOfSemesters: {
    type: Number,
    required: [true, "Mention Number of Semesters"],
  },
  hodKey: {
    type: String,
  },
  facultyCount: {
    type: Number,
  },
  studentsCount: {
    type: Number,
  },
  yearIncharge: [yearInchargeSchema],
});

const departmentModel = new mongoose.model("departments", departmentSchema);

module.exports = departmentModel;

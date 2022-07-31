const mongoose = require("mongoose");
const { isEmail } = require("validator");

const staffInfoSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: [true, "Staff must have a name"],
    trim: true,
  },
  staffDesignation: {
    type: String,
    required: [true, "Required grade as Assistant / Associate / Professor"],
    trim: true,
  },
  staffDepartment: {
    type: String,
    required: [true, "Required Department Staff or Office Staff"],
    trim: true,
  },
  staffEmail: {
    type: String,
    required: [true, "Staff must have an email id"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },
  phoneNumber: {
    type: String,
    required: [true, "Staff must mention his/her phone number"],
  },
});

const staffInfoModel = new mongoose.model("staffInfo", staffInfoSchema);

module.exports = staffInfoModel;

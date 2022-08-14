const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  id: String,
  lightBg: Boolean,
  lightText: Boolean,
  lightTextDesc: Boolean,
  topLine: String,
  headLine: String,
  description: String,
  buttonLabel: String,
  imgStart: Boolean,
  img: String,
  alt: String,
  dark: Boolean,
  primary: Boolean,
  darkText: Boolean,
});

const homeDataModel = new mongoose.model("homedata", homeSchema);

module.exports = homeDataModel;

///lorem

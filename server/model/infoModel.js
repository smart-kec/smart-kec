import mongoose from "mongoose";
import studentInfo from "./InfoSubCollections/studentInfoModel";

const infoSchema = new mongoose.Schema({
  studentInfo,
});

const infoModel = new mongoose.model("info", infoSchema);
module.exports = infoModel;

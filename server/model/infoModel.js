import mongoose from "mongoose";
import studentInfo from "./InfoSubCollections/studentInfoModel";
import organizerInfo from "./InfoSubCollections/organizerInfoModel";
import staffInfo from "./InfoSubCollections/studentInfoModel";
import labInfo from "./InfoSubCollections/labsInfo";
import hallInfo from "./InfoSubCollections/hallsInfoSchema";

const infoSchema = new mongoose.Schema({
  students: [studentInfo],
  organizers: [organizerInfo],
  staffs: [staffInfo],
  labs: [labInfo],
  halls: [hallInfo],
});

const infoModel = new mongoose.model("info", infoSchema);
module.exports = infoModel;

import mongoose from "mongoose";
import studentInfo from "./InfoCollections/studentInfoModel";
import organizerInfo from "./InfoCollections/organizerInfoModel";
import staffInfo from "./InfoCollections/studentInfoModel";
import labInfo from "./InfoCollections/labsInfo";
import hallInfo from "./InfoCollections/hallsInfoSchema";

const infoSchema = new mongoose.Schema({
  students: [studentInfo],
  organizers: [organizerInfo],
  staffs: [staffInfo],
  labs: [labInfo],
  halls: [hallInfo],
});

const infoModel = new mongoose.model("info", infoSchema);
module.exports = infoModel;

import mongoose, { Schema } from "mongoose";

const computerSpecsSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  value: {
    type: String,
  }
});

const dateSchema = new mongoose.Schema({
  hour: {
    type: Number,
    required: [true, "Hour Required"],
  },
  minutes: {
    type: Number,
    required: [true, "Minutes REquired"],
  }
});
const timingsSchema = new mongoose.Schema({
  from: dateSchema,
  to: dateSchema,
  slotNo: {
    type: Number,
  }
});

const timeTableSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  day: {
    type: String,
  },
  classKey: {
    type: String,
  },
  subject: {
    type: String,
  },
  staffKey: {
    type: String,
  },
  supportStaffKeys: {
    type: [String],
  },
});

const bookingDateSchema = new mongoose.Schema({
    date : {
        type : String,
        unique : true
    },
    bookingKeys : {
        type : [String]
    }
});


const labInfoSchema = new mongoose.Schema({
  labNo: {
    type: String,
    unique: true,
    trim: true,
  },
  labName: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Lab name must be mentioned"],
  },
  labEmail: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Lab must have an email id"],
  },
  inchargeKey: {
    type: String,
  },
  assistantKey: {
    type: String,
  },
  labDept: {
    type: String,
    required: [true, "Lab must be related to any one of the department"],
  },
  noOfComputers: {
    type: Number,
    default: 0,
  },
  labCapacity: {
    type: Number,
    default: 0,
  },
  softwaresInstalled: {
    type: String,
  },
  computerSpecs: [computerSpecsSchema],

  timings: [timingsSchema],

  timeTable: [timeTableSchema],

  bookings : [bookingDateSchema]
});

const labInfoModel = new mongoose.model("labInfo", labInfoSchema);

module.exports = labInfoModel;

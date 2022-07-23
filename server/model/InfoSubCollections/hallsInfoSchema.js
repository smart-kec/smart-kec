import mongoose from "mongoose";

const bookingDateSchema = new mongoose.Schema({
    date : {
        type : String,
        unique : true
    },
    bookingKeys : {
        type : [String]
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

const hallsInfoSchema = new mongoose.Schema({
    
    hallName : {
        type : String,
        unique : true,
        trim : true
    },
    hallEmailId : {
        type : String,
        unique : true
    },
    hallCapacity : {
        type : Number
    },

    timings: [timingsSchema],

    bookingKeys : [bookingDateSchema]
});
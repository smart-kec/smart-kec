import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
  from: {
    type: String,
    required: [true, "Required time"],
  },
  to: {
    type: String,
    required: [true, "Required time"],
  },
  date: {
    type: String,
    required: [true, "Required date"],
  },
  status: {
    type: String,
  },
  purposeOfBooking: {
    type: String,
    required: [true, "Required purpose to book"],
  },
  neededFeatures: {
    type: String,
  },
  organizerName: {
    type: String,
    required: [true, "Required organizer name"],
  },
  organizerKey: {
    type: String,
    required: [true, "Required organizer key"],
  },
  venueKey: {
    type: String,
    required: [true, "Required Venue Key"],
  },
});

const bookingsModel = new mongoose.model("bookings", bookingsSchema);

module.exports = bookingsModel;

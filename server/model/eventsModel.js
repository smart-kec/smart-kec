const mongoose = require("mongoose");

const festEventsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Fest must contain an Event name"],
    trim: true,
    unique: true,
  },

  eventStartDate: {
    type: Date,
    required: [true, "An event must have a start date and start time"],
  },

  eventEndDate: {
    type: Date,
    required: [true, "An event must have an end date and end time"],
  },

  eventVenue: {
    type: String,
    default: null,
  },
  typeOfEvent: {
    type: String,
    required:
      "Event must mention its type : Technical or Non-Technical or Coding or Social Activity",
  },
  eventOrganizersKeys: {
    type: [String],
    required: [true, "Event must contain Organizers"],
  },
  eventPoster: {
    type: String,
    unique: true,
  },
  eventDescription: {
    type: String,
    required: "An event must contain description and rules",
  },

  registrationEndingDate: {
    type: Date,
    required: [true, "Event must contain registration ending date"],
  },

  chatLink: {
    type: String,
    required: [
      true,
      "Whatsapp Link or Telegram link is needed for students for further communication",
    ],
    unique: true,
  },

  isDocumentRequired: {
    type: Boolean,
    required: [true, "Required is Document need to be collected from student"],
    default: false,
  },

  isAttendenceRequired: {
    type: Boolean,
    required: [true, "Required : Whether attendence is needed?"],
    default: false,
  },
});

const eventInfoSchema = new mongoose.Schema({
  festName: {
    type: String,
    required: [true, "Event name is must for the new Event"],
    unique: true,
    trim: true,
  },

  festId: {
    type: String,
    required: [true, "An event must have an event id"],
    trim: true,
  },

  organizerKey: {
    type: ObjectId,
    required: [true, "Organizer for an event is must"],
  },
  coOrganizersKeys: {
    type: [ObjectId],
    default: [],
  },

  overAllCoOrdinatorsKeys: [String],

  festLogo: {
    type: String,
    trim: true,
    unique: true,
  },

  festStartDate: {
    type: Date,
    required: [true, "An event must contain a start Date and Start Time"],
  },

  festEndDate: {
    type: Date,
    required: [true, "An event must have a end date and End Time"],
  },

  festVenue: {
    type: ObjectID,
    trim: true,
    default: null,
  },

  festEvents: {
    type: [festEventsSchema],
    default: [],
  },

  festPoster: {
    type: String,
    trim: true,
    unique: true,
  },

  festPromoVideo: {
    type: String,
    unique: true,
  },

  festStatus: {
    type: Boolean,
    required: [true, " Fest Status Required / "],
  },

  festYear: {
    type: Number,
    required: [true, "Fest Year Required"],
  },
});

const eventInfoModel = mongoose.model("eventinfo", eventInfoSchema);
module.exports = eventInfoModel;

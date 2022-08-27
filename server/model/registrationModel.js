const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventKey: {
    type: String,
  },
  regstd: [
    {
      stdKeys: {
        type: [String],
        default: [],
      },
      docLink: {
        type: String,
      },
    },
  ],
  selStd: [String],
  participatedStd: [String],
});

const registrationModel = mongoose.model(
  "registrationinfo",
  registrationSchema
);

module.exports = registrationModel;

const { Schema, model } = require("mongoose");
const moment = require("moment");

const memeSchema = new Schema(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    initialUrl: {
      type: String,
      required: true,
    },
    _api_id: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      default: moment().format("MM-DD-YY hh:mm"),
    },
    alias: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Meme", memeSchema);

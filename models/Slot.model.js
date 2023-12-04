const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  date: String,
  time: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  isBooked: Boolean,
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;

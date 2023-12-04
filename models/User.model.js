const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  label: {
    type: String,
    required: true,
  },
  booked_slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

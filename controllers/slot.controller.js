const User = require("../models/User.model");
const Slot = require("../models/Slot.model");

exports.getAllSlots = async (req, res) => {
  try {
    let { date } = req.query;
    console.log(date);
    let slots = await Slot.find({ date: date }).populate("userId");
    console.log(slots);
    res.json({ messsage: "Slots Found!", slots: slots });
  } catch (err) {
    res.status(400).json({ message: "Couldn't find slots", err });
  }
};

exports.bookSlot = async (req, res) => {
  try {
    let { date, time, userId } = req.body;
    let slot = await Slot.findOne({ date, time });
    if (slot) {
      return res
        .status(400)
        .json({ message: "Can't Book Slot Already Booked" });
    }
    let newSlot = new Slot({ date, time, userId, isBooked: true });
    await newSlot.save();

    await User.findByIdAndUpdate(userId, { $push: { booked_slots: userId } });
    // console.log(newSlot);
    return res
      .status(201)
      .json({ message: "Slot Booked Successfully", user: newSlot });
  } catch (err) {
    res.status(400).json({ message: "Couldn't create New Contact", err });
  }
};

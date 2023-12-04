const User = require("../models/User.model");

exports.getAllContacts = async (req, res) => {
  try {
    let { name, page = 1, limit = 10 } = req.query;
    if (name) {
      let users = await User.find({ name: name })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      return res.status(200).json({ message: "Users Found", users });
    }

    let count = await User.countDocuments();
    let users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.status(200).json({
      message: "Users Found",
      users,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(400).json({ message: "Couldn't find users", err });
  }
};

exports.addNewContact = async (req, res) => {
  try {
    let { name, email, phone, label } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    let existingUserContact = await User.findOne({ phone });
    if (existingUserContact) {
      return res.status(400).json({
        message: "User already exists with this phone number",
        user: existingUserContact,
      });
    }

    let newUser = new User({ name, email, phone, label, booked_slots: [] });
    await newUser.save();
    console.log(newUser);
    return res
      .status(201)
      .json({ message: "Contact Created Successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "Couldn't create New Contact", err });
  }
};

exports.updateContact = async (req, res) => {
  let userId = req.params.id;

  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User Doesn't Exits" });
    }

    let newUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    console.log(newUser);
    res
      .status(200)
      .json({ message: "Contact Updated Successfully", user: newUser });
  } catch (e) {
    res.status(400).json({ message: "Couldn't Update Contact", err });
  }
};

exports.deleteContact = async (req, res) => {
  let userId = req.params.id;

  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User Doesn't Exits" });
    }

    let newUser = await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ message: "Contact Deleted Successfully", user: newUser });
  } catch (e) {
    res.status(400).json({ message: "Couldn't Delete Contact", err });
  }
};

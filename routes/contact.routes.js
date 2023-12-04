const express = require("express");
const router = express.Router();

const contactController = require("../controllers/user.controller");

router.get("/", contactController.getAllContacts);

router.post("/", contactController.addNewContact);

router.patch("/:id", contactController.updateContact);

router.delete("/:id", contactController.deleteContact);

module.exports = router;

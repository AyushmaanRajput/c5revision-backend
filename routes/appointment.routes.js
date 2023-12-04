const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slot.controller");

router.get("/", slotController.getAllSlots);

router.post("/", slotController.bookSlot);

module.exports = router;

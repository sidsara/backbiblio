const express = require("express");
const router = express.Router();
const tourController = require("../Controllers/tourController");

router.get("/", tourController.getTours);

module.exports = router;

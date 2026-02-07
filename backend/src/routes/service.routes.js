const express = require("express");
const router = express.Router();

const {
  getServices
} = require("../controllers/service.controller");

// PUBLIC – frontend uses this
router.get("/", getServices);

module.exports = router;
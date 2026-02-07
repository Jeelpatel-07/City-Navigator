const express = require("express");
const router = express.Router();

const vendorController = require("../controllers/vendor.controller");
const authMiddleware = require("../middleware/auth.middleware");

// AUTH
router.post("/register", vendorController.registerVendor);
router.post("/login", vendorController.loginVendor);

// 🔐 CHANGE PASSWORD (PROTECTED)
router.put(
  "/change-password",
  authMiddleware,
  vendorController.changeVendorPassword
);

module.exports = router;

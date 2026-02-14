const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  changePassword
} = require("../controllers/auth.controller");

// USER AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", auth, changePassword);

module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validateInput");
const upload = require("../config/multer");

router.post(
  "/register",
  upload.single("profileImage"),
  validateRegistration, // This will now include result validation
  authController.register
);

router.post(
  "/login",
  validateLogin, // This will now include result validation
  authController.login
);

router.post("/verify-otp", authController.verifyOTP);

module.exports = router;

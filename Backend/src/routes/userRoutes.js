const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/profile", auth, userController.getUserProfile);
router.delete("/account", auth, userController.deleteAccount);

module.exports = router;

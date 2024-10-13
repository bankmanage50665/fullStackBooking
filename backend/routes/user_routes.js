const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");



router.post("/register", userController.register);
router.post("/sendotp", userController.sendOTP);
router.post("/verify", userController.verifyOtp);
router.get("/:id", userController.hotelByUserId);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { check } = require("express-validator");

// router.post(
//   "/signup",
//   [
//     check("name").not().isEmpty(),
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 5 }),
//   ],
//   userController.signup
// );
// router.post(
//   "/login",
//   [
//     check("email").normalizeEmail().isEmail(),
//     check("password").isLength({ min: 5 }),
//   ],
//   userController.login
// );

router.post("/register", userController.register);
router.post("/sendotp", userController.sendOTP);
router.post("/verify", userController.verifyOtp);
router.get("/:id", userController.hotelByUserId);

module.exports = router;

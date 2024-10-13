// routes/bookingRoutes.js
const express = require("express");
const { check } = require("express-validator");

const {
  createBooking,
  getUserBookings,
  cancelBooking,
  deleteBooking,
  getAllBooking,
} = require("../controllers/booking_controller");

const router = express.Router();

router.post(
  "/",
  [
    check("userId").not().isEmpty(),
    check("hotelId").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("phoneNumber").isLength({ min: 10 }),
    check("checkInDate").not().isEmpty(),
    check("checkOutDate").not().isEmpty(),
    check("totalPrice").not().isEmpty(),
    check("numberOfGuests").not().isEmpty(),
  ],
  createBooking
);
router.get("/", getAllBooking);
router.get("/:userId", getUserBookings);
router.patch("/:bookingId/cancel", cancelBooking);
router.delete("/:bookingId/delete", deleteBooking);

module.exports = router;

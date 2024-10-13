// controllers/bookingController.js
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

const Booking = require("../model/booking_model");
const User = require("../model/user_model");
const HttpError = require("../utils/errorModal");
const Hotel = require("../model/hotel_model");

// Create a new booking
exports.createBooking = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new HttpError("Invalid user credentials.", 500));
  }
  const {
    userId,
    hotelId,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    totalPrice,
    phoneNumber,
    userName,
  } = req.body;

  const newBooking = new Booking({
    userId,
    hotelId,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    totalPrice,
    status: "Booked",
    phoneNumber,
    userName,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find user for bookig, Please try again later.",
        500
      )
    );
  }

  if (!user) {
    return next(
      new HttpError("Couldn't find user in database with that id", 500)
    );
  }

 

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newBooking.save({ session: sess });
    user.bookedRooms.push(newBooking);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Field to create booking, Please try again later.", 500)
    );
  }

  let hotel;
  try {
    hotel = await Hotel.findById(hotelId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find hoteles for bookig, Please try again later.",
        500
      )
    );
  }

  if (!hotel) {
    return next(
      new HttpError("Couldn't find hotele in database with that id", 500)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newBooking.save({ session: sess });
    hotel.bookingId.push(newBooking);
    await hotel.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        "Field to adding bookingId to hoteles bookingId array, Please try again later.",
        500
      )
    );
  }

  res.json({
    message: "Hotel booked sucessfully",
    newBooking: newBooking.toObject({ getters: true }),
  });
};

exports.getAllBooking = async (req, res, next) => {
  let allBookings;
  try {
    allBookings = await Booking.find().populate("userId").populate({
      path: "hotelId",
      model: "Hotel",
      select: "-creator -bookingId",
    });
  } catch (err) {
    return next(
      new HttpError("Field to load all bookings, Please try again later.", 500)
    );
  }

  res.json({
    message: "Load all booking sucessfully.",
    bookings: allBookings.map((booking) => booking.toObject({ getters: true })),
  });
};

exports.getUserBookings = async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    return next(new HttpError("Couldn't get id", 500));
  }

  try {
    // const bookings = await Booking.find({ userId });
    const bookings = await User.findById(userId).populate({
      path: "bookedRooms",
      model: "Booking",
      populate: { path: "hotelId", model: "Hotel" },
    });

    res.json({
      message: "Booked hotel fetched sucessfully.",
      booking: bookings.toObject({ getters: true }),
    });
  } catch (err) {
    return next(
      new HttpError(
        "Field to fetch booked hoteles, Please try again later." || err.message,
        500
      )
    );
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const { status } = req.body;

  let booking;
  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    return next(
      new HttpError("Field to find booking, Please try again later.", 500)
    );
  }

  if (!booking) {
    return next("No booking find to cancel.", 500);
  }

  booking.status = status;

  // await booking.save()

  try {
    await booking.save();
  } catch (err) {
    return next(
      new HttpError("Field to cancel booking, Please try again later.", 500)
    );
  }

  res.json({
    message: "Hotel booking canceled sucessfully",
    status: booking.status,
  });
};

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  let booking;
  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    return next(
      new HttpError("Field to find booking by id, Please try again later.", 500)
    );
  }

  if (!booking) {
    return next(
      new HttpError("Haven't book hotel yet, Please try again later.", 500)
    );
  }

  let user;
  try {
    user = await User.findById(booking.userId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find user by id for delete booking, Please try again later.",
        500
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await booking.deleteOne({ session: sess });
    user.bookedRooms.pull(booking._id);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Field to  delete booking, Please try again later.", 500)
    );
  }

  res.status(200).json({ message: "Booking delete sucessfully" });
};

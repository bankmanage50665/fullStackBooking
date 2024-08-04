const { validationResult } = require("express-validator");
const HttpError = require("../middleware/HttpError");
const Hotel = require("../model/hotel_model");
const { default: mongoose } = require("mongoose");
const User = require("../model/user_model");

async function addHotle(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const {
    name,
    address,
    price,
    phone,
    images,
    creator = "66af59012aec05ace0ccc101",
    bookedBy,
    type,
    status = "Unbooked",
  } = req.body;

  const createHoteses = new Hotel({
    name,
    address,
    price,
    bookedBy,
    phone,
    images,
    creator,
    type,
    status,
  });

  const findCreator = await User.findById(creator);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createHoteses.save({ session: sess });
    findCreator.createdRooms.push(createHoteses);
    await findCreator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Field to create hoteles.", 500));
  }

  res.json({
    message: "Hoteles added sucessfully.",
    hoteles: createHoteses,
  });
}

async function getHotelesList(req, res, next) {
  let hoteles;
  try {
    hoteles = await Hotel.find();
  } catch (err) {
    return next(new HttpError("Field to find list of hoteles.", 500));
  }

  res.json({
    message: "Fetch hoteleslist sucessfully.",
    hoteles: hoteles.map((hoteles) => hoteles.toObject({ getters: true })),
  });
}

async function hotelById(req, res, next) {
  const hotelId = req.params.id;

  let findHotelById;
  try {
    findHotelById = await Hotel.findById(hotelId);
  } catch (err) {
    return next(
      new HttpError("Field to find hotel , Please try again later.", 500)
    );
  }

  if (!findHotelById) {
    return next(new HttpError("We couldn't find "));
  }

  return res.json({
    message: "Hoteles find sucessfully by id.",
    hotel: findHotelById.toObject({ getters: true }),
  });
}

async function updateHotel(req, res, next) {
  const hotelId = req.params.id;

  if (!hotelId) {
    return new HttpError("Hotel id is required", 400);
  }

  const { name, address, price, phone, type, status } = req.body;

  const findHotelById = await Hotel.findById(hotelId);

  if (!findHotelById) {
    return next(new HttpError("Couldn't find hotel for update.", 500));
  }

  findHotelById.name = name;
  findHotelById.address = address;
  findHotelById.price = price;
  findHotelById.phone = phone;
  findHotelById.type = type;
  findHotelById.status = status;

  try {
    await findHotelById.save();
  } catch (err) {
    return next(
      new HttpError("Field to update hotel, Please try again later.", 500)
    );
  }

  res.json({ message: "Hotel update sucessfully.", hotel: findHotelById });
}

async function deleteHotel(req, res, next) {
  const hotelId = req.params.id;
  if (!hotelId) {
    return new HttpError("Hotel id is required", 400);
  }

  let findHotelById;
  try {
    findHotelById = await Hotel.findByIdAndDelete(hotelId);
  } catch (err) {
    return next(
      new HttpError("Field to delete hotel, Please try again later.", 500)
    );
  }

  res.json({ message: "Hotel delete sucessfully.", hotel: findHotelById });
}

async function bookHotel(req, res, next) {
  const hotelId = req.params.id;
  if (!hotelId) {
    return next(new HttpError("Couldn't find hotel id"));
  }
  const { status, userId = "66af59012aec05ace0ccc101" } = req.body;

  const findHotelToBook = await Hotel.findById(hotelId);

  findHotelToBook.status = status;

  const bookBy = await User.findById(userId);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await findHotelToBook.save({ session: sess });
    bookBy.bookedRooms.push(findHotelToBook);
    await bookBy.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Field to booked hotel. Please try again later.", 500)
    );
  }
  res.json({ message: "Hotel booked sucessfully.", hotel: findHotelToBook });
}

module.exports = {
  addHotle,
  getHotelesList,
  hotelById,
  updateHotel,
  deleteHotel,
  bookHotel,
};

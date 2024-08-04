const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const HttpError = require("../middleware/HttpError");
const User = require("../model/user_model");
const Hotel = require("../model/hotel_model");

async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid user credentials", 401));
  }

  const { name, email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError(
        "Field to hashed user password, Please try again later.",
        401
      )
    );
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    bookedRooms: [],
    createdRooms: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Field to created user, Please try again later.", 401)
    );
  }
  //   let token;
  //   try {
  //     token = jwt.sign(
  //       { userId: createdUser.id, email: createdUser.email },
  //       "secret",
  //       { expiresIn: "5h" }
  //     );
  //   } catch (err) {}

  return res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
  });
}

async function login(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid user credentials", 401));
  }

  const { email, password } = req.body;

  let findUser = false;
  try {
    findUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Field to login, Please try again later.", 401));
  }

  if (!findUser) {
    return next(
      new HttpError(
        "Couldn't find user with that email, Please first create account.",
        500
      )
    );
  }

  let comparePassword;
  try {
    comparePassword = await bcrypt.compare(findUser.password, password);
  } catch (err) {
    return next(
      new HttpError("Field to varify user, User credintial wrong.", 500)
    );
  }

  // let token;
  // try {
  //   token = jwt.sign({ userId: findUser.id, email: findUser.email }, "secret", {
  //     expiresIn: "5h",
  //   });
  // } catch (err) {}

  res.json({
    message: "User login sucessfully.",
    userId: findUser.id,
    email: findUser.email,
  });
}

async function hotelByUserId(req, res, next) {
  const id = req.params.id;

  if (!id) {
    return next(
      new HttpError("Couldn't find id, Please try again later.", 500)
    );
  }

  const userHotel = await Hotel.findById(id).populate("bookedBy");

  res.json({
    message: "Hotel fatched sucessfully",
    hotel: userHotel.toObject({ getters: true }),
  });
}

module.exports = { signup, login, hotelByUserId };

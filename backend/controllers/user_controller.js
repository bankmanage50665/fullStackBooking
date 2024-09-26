const { validationResult } = require("express-validator");
const twilio = require("twilio");
const OTPGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/errorModal");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const User = require("../model/user_model");
const Hotel = require("../model/hotel_model");



async function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid user credentials", 401));
  }

  try {
    const { phoneNumber, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ phoneNumber });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({ phoneNumber, name, bookedRooms: [], createdRooms: [] });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: user.toObject({ getters: true }),
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Field to regester new user, Please try again later." });
  }
}


async function sendOTP(req, res, next) {
  try {
    const { phoneNumber } = req.body;

    const otp = OTPGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      {
        otp,
        otpExpiration: new Date(Date.now() + 1 * 60 * 1000), // OTP expires in 5 minutes
      },
      { new: true, upsert: true } // Create a new user if not found
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // await client.messages.create({
    //   body: `Your OTP is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: `+91${phoneNumber}`,
    // });

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Field to send otp, Please try agin later." });
  }
}

async function verifyOtp(req, res, next) {
  const { phoneNumber, otp } = req.body;

 

  try {
    const user = await User.findOne({ phoneNumber });

   

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiration < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.otp = undefined;
    user.otpExpiration = undefined;

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "10h",
    });

    res.status(200).json({
      token,
      userId: user._id,
      userName: user.name,
      phoneNumber,
      message: "OTP verified successfully",
    });
  } catch (err) {
    return res.json({
      message: "Field to verify otp , Please try again later.",
    });
  }
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



module.exports = { register, sendOTP, verifyOtp, hotelByUserId };

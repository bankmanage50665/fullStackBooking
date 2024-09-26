const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiration: {
      type: Date,
      required: false,
    },

    bookedRooms: [{ type: mongoose.Types.ObjectId, ref: "Hotel" }],
    createdRooms: [{ type: mongoose.Types.ObjectId, ref: "Hotel" }],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;

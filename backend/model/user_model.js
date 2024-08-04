const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookedRooms: [{ type: mongoose.Types.ObjectId, ref: "Hotel" }],
  createdRooms: [{ type: mongoose.Types.ObjectId, ref: "Hotel" }],
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;

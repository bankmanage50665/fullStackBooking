const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: String },
  phone: { type: Number, required: true },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;

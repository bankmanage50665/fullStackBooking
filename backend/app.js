const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const userRoutes = require("./routes/user_routes");
const hotelRoutes = require("./routes/hotel_routes.js");

const url =
  "mongodb+srv://rahul1234:YaUJqtFam74ZnZvL@cluster0.wdrbduw.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // End the request with a 200 status for preflight
  }

  next();
});

app.use("/users", userRoutes);
app.use("/hoteles", hotelRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.files.forEach((file) => file.path));
  }

  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({
    message: err.message || "Something went wrong, Please try again later.",
  });
});

mongoose
  .connect(url)
  .then((req, res) => {
    app.listen(80);
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const hotelController = require("../controllers/hotel_controller");

router.post(
  "/add",
  [
    check("name").not().isEmpty(),
    check("address").isLength(
      { min: 5 },
      check("price").not().isEmpty(),
      check("phone").isLength({ min: 10 })
    ),
  ],
  hotelController.addHotle
);

router.get("/hotelesList", hotelController.getHotelesList);
router.get("/:id", hotelController.hotelById);
router.patch("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);
router.patch("/:id/book", hotelController.bookHotel);



module.exports = router;
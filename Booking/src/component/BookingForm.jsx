// src/components/BookingForm.js
import React, { useState } from "react";

import { getUserId } from "../middleware/getToken";

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = getUserId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...bookingData }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      }
    
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        required
      />
      <input
        type="number"
        value={numberOfGuests}
        onChange={(e) => setNumberOfGuests(e.target.value)}
        required
      />
      <input
        type="number"
        value={totalPrice}
        onChange={(e) => setTotalPrice(e.target.value)}
        required
      />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;

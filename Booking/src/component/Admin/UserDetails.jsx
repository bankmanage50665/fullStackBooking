import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function UserDetails({
  phoneNumber,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  totalPrice,
}) {
  return (
    <>
      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaPhone className="text-green-500 text-xl" />
          <p>{phoneNumber}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaCalendarAlt className="text-red-500 text-xl" />
          <div>
            <p>
              Check-in:
              {new Date(checkInDate).toLocaleDateString()}
            </p>
            <p>
              Check-out:
              {new Date(checkOutDate).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaUsers className="text-purple-500 text-xl" />
          <p>Guests: {numberOfGuests}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaMoneyBillWave className="text-yellow-500 text-xl" />
          <p className="font-bold">Total: ${totalPrice}</p>
        </motion.div>
      </div>
    </>
  );
}

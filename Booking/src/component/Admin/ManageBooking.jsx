import {
  Form,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LoadingComponent from "../../shared/component/LoadingComponent";
import UserDetails from "./UserDetails";
import HotelDetails from "./HotelDetails";

import { getUserId, getCreator } from "../../middleware/getToken";

export default function GetAllBooking() {
  const data = useLoaderData();
  const [changeBookingStatus, setChangeBookingStatus] = useState("");
  const [expandedBookings, setExpandedBookings] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);

  const newDate = new Date();
  const currentDate = newDate.toLocaleDateString();
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const userid = getUserId();
  const creatorid = getCreator();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token]);

  const booking = data.bookings;
  const toggleBookingDetails = (index) => {
    setExpandedBookings((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  function handleUpdateChange(e) {
    const { value } = e.target;

    setChangeBookingStatus(value);
  }

  async function updateBookingStatus(e, bookingId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}/update`,
        {
          method: "PATCH",
          body: JSON.stringify({ ...userData, status: changeBookingStatus }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setLoading(false);
      throw new Error("Field to update hotel, Please try again later.", 500);
    }

    navigate(`/admin`);
    setLoading(false);
  }

  async function handleDelete(bookingId) {
    setLoadDelete(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}/cancel`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setLoadDelete(false);
      throw new Error("Field to update hotel, Please try again later.", 500);
    }

    navigate(`/admin`);
    setLoadDelete(false);
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-6 bg-gray-50 min-h-screen"
      >
        {booking ? (
          <ul className="space-y-6">
            {booking.map((book, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <FaUser className="text-blue-600 text-2xl" />
                      <p className="font-semibold text-xl text-gray-800">
                        {book.userName}
                      </p>
                    </div>
                    <div
                      className={`font-semibold text-xl ${
                        book.status === "Confirmed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {book.status}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookingDetails(index)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    <span>
                      {expandedBookings[index] ? "Hide Details" : "Load More"}
                    </span>
                    {expandedBookings[index] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {expandedBookings[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <UserDetails
                            checkInDate={book.checkInDate}
                            checkOutDate={book.checkOutDate}
                            numberOfGuests={book.numberOfGuests}
                            phoneNumber={book.phoneNumber}
                            totalPrice={book.totalPrice}
                          />
                        </div>
                        <div>
                          <HotelDetails
                            address={book.hotelId.address}
                            images={book.hotelId.images}
                            name={book.hotelId.name}
                            phone={book.hotelId.phone}
                            price={book.hotelId.price}
                            type={book.hotelId.type}
                          />
                        </div>
                      </div>
                      <h1 className="text-xl font-semibold text-gray-800 mt-4">
                        Update Booking Status
                      </h1>
                      <Form
                        onSubmit={(e) => updateBookingStatus(e, book._id)}
                        className="h-96 p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label
                              htmlFor="update"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Update booking status
                            </label>
                            <select
                              id="update"
                              onChange={(e) => handleUpdateChange(e)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              <option value="">Select status</option>
                              <option value="Clear">Clear</option>
                              <option value="Booked">Booked</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="checkOutDate"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              <FaCalendarAlt className="inline mr-2" />
                              Check-out Date
                            </label>
                            <input
                              id="checkOutDate"
                              type="date"
                              name="checkOutDate"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="numberOfGuests"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            <FaUsers className="inline mr-2" />
                            Number of Guests
                          </label>
                          <input
                            id="numberOfGuests"
                            type="number"
                            required
                            min="1"
                            name="numberOfGuests"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-300 ease-in-out"
                        >
                          {loading ? (
                            <LoadingComponent />
                          ) : (
                            "Update Room Status"
                          )}
                        </motion.button>
                      </Form>
                      <div className="flex justify-end mt-4">
                        <motion.button
                          disabled={loadDelete}
                          onClick={() => handleDelete(book.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                            loadDelete
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          {loadDelete ? <LoadingComponent /> : "Delete booking"}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-center text-gray-800"
          >
            Loading...
          </motion.h1>
        )}
      </motion.div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookings`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }

    return resData;
  } catch (err) {
    throw JSON;
  }
}

import {
  json,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaCalendarAlt, FaDollarSign, FaUser } from "react-icons/fa";
import { BiSolidHotel } from "react-icons/bi";

import { useEffect, useState } from "react";
import LoadingComponent from "../shared/component/LoadingComponent";
import HelplineNumber from "../shared/component/HelplineNumber";

import { getUserId } from "../middleware/getToken";
export default function BookedHotel() {
  const [isCanceled, setIsCanceled] = useState(false);
  const sp = useParams().id;
  const data = useLoaderData();
  const booking = data && data.booking;
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (token === null || !token) {
      navigate("/login");
    }
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      setIsCanceled(true);
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
      setIsCanceled(false);
      throw json(
        { message: "Field to cancel booking, Please try agin later." },
        { status: 401 }
      );
    }

    setIsCanceled(false);
    return navigate(`/booked/${sp}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {booking && booking.bookedRooms.length >= 1 ? (
            <motion.ul
              className="space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-extrabold text-white mb-12 text-center">
                Your Booked Rooms
              </h1>
              {booking.bookedRooms.map((booking, index) => (
                <motion.li
                  key={index}
                  className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 w-full md:w-2/5">
                      <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                        autoPlay={false}
                        interval={5000}
                      >
                        {booking.hotelId.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="full">
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                              alt={`Hotel image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="p-10 md:w-3/5">
                      <div className="uppercase tracking-wide text-sm text-indigo-400 font-bold mb-2">
                        {booking.status}
                      </div>
                      <h2 className="text-3xl leading-tight font-extrabold text-white mb-4">
                        {booking.hotelId.name}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="flex items-center text-gray-300">
                            <FaCalendarAlt className="mr-2 text-indigo-400" />
                            Check-in:
                            <span className="ml-2 ">
                              {new Date(
                                booking.checkInDate
                              ).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center text-gray-300">
                            <FaCalendarAlt className="mr-2 text-indigo-400" />
                            Check-out:
                            <span className="ml-2">
                              {new Date(
                                booking.checkOutDate
                              ).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center text-gray-300">
                            <FaDollarSign className="mr-2 text-indigo-400" />
                            Total Amount:
                            <span className="ml-2">{booking.totalPrice}</span>
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center text-gray-300">
                            <FaUser className="mr-2 text-indigo-400" />
                            Number of Guests:
                            <span className="ml-2">
                              {booking.numberOfGuests}
                            </span>
                          </p>
                        </div>
                        <div>
                          <HelplineNumber phoneNumber={booking.phoneNumber} />
                        </div>
                      </div>
                      <div className="border-t border-gray-700 pt-4">
                        <p className="flex items-center text-gray-300 mb-2">
                          <FaUser className="mr-2 text-indigo-400" />
                          Booked by:{" "}
                          <span className="ml-2">{booking.userName}</span>
                        </p>
                      </div>
                      <div>
                        <p className={`flex items-center text-gray-300`}>
                          <BiSolidHotel className="mr-2 text-indigo-400" />
                          Booking status:
                          <span
                            className={`ml-2 ${
                              booking.status.toUpperCase() === "CANCELED"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                        </p>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={booking.status === "Canceled"}
                        onClick={() => handleCancelBooking(booking._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        {booking.status === "Canceled" ? (
                          <p>You canceled your hotel booking</p>
                        ) : isCanceled ? (
                          <LoadingComponent />
                        ) : (
                          "Cancel booking"
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-center text-2xl text-gray-300">
              No bookings yet. Time to plan your next luxurious getaway!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const userid = getUserId();

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookings/${userid}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw json(
      { message: "Field to find booked hotel, Please try again later." },
      { status: 500 }
    );
  }
}

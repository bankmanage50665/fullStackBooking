import { useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  json,
} from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { getUserId, getPhoneNumber } from "../middleware/getToken";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import LoadingComponent from "../shared/component/LoadingComponent";

export default function HotelRooms() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [userName, setUserName] = useState("");
  const [loading, setIsLoading] = useState(false);

  const data = useLoaderData();
  const hotel = data?.hotel || {};
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const userId = getUserId();
  const phoneNumber = getPhoneNumber();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelId = hotel._id;
    const bookingData = {
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice: hotel.price,
      userName,
      phoneNumber,
    };

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:80/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookingData }),
      });

      const resData = await response.json();

      console.log(resData);
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating booking:", error);
    }
    navigate("/booked/:id");
    setIsLoading(false);
  };

  return (
    <>
      <div className="mt-5 ml-5">
        <Link
          to="../../"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition duration-300 ease-in-out"
        >
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            ←
          </motion.span>
          <span className="ml-2">Back to all hotels</span>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  autoPlay={false}
                  infiniteLoop={true}
                  interval={5000}
                  className="h-64 md:h-full"
                >
                  {hotel.images &&
                    hotel.images.map((img, index) => (
                      <motion.div
                        key={index}
                        className="h-64 md:h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={`http://localhost/${img}`}
                          alt={`${hotel.name} - Image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                    ))}
                </Carousel>
              </div>
              <div className="md:w-1/2 p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    <FaStar className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-gray-700 mr-4">4.8</span>
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-500 mr-1" />
                    <span className="text-gray-700">Central Location</span>
                  </div>
                  <p className="text-3xl font-semibold text-blue-600 mb-6">
                    {hotel.price}{" "}
                    <span className="text-base text-gray-600">per night</span>
                  </p>
                  <p className="text-gray-600 mb-8">{hotel.description}</p>
                  <div className="flex items-center mb-8">
                    <FaPhone className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{hotel.phone}</span>
                  </div>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="checkIn"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        <FaCalendarAlt className="inline mr-2" />
                        Check-in Date
                      </label>
                      <input
                        id="checkIn"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="checkOut"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        <FaCalendarAlt className="inline mr-2" />
                        Check-out Date
                      </label>
                      <input
                        id="checkOut"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaUsers className="inline mr-2" />
                      Number of Guests
                    </label>
                    <input
                      id="guests"
                      type="number"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(e.target.value)}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaUser className="inline mr-2" />
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    {loading ? <LoadingComponent /> : "Book now & Pay at hotel"}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.id;
  try {
    const response = await fetch(`http://localhost/hoteles/${id}`);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Internal server err, Please try again later.");
    }

    return resData;
  } catch (err) {
    throw json(
      { message: "Field to find hotel, Please try again later." },
      { status: 500 }
    );
  }
}

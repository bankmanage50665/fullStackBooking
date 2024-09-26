import { useState } from "react";
import { Link, useLoaderData, useNavigate, useRouteLoaderData, json, Form } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';
import { Clock, Users, Phone, CreditCard, Star, MapPin } from 'lucide-react';
import { getUserId, getUserName } from "../middleware/getToken";

export default function HotelRooms() {
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [guestCount, setGuestCount] = useState(1);
  const [book, setBook] = useState(null);
  const data = useLoaderData();
  const hotel = data?.hotel || {};
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const userId = getUserId();
  const userName = getUserName();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (e) => {
    setCheckinDate(new Date(e.target.value));
  };

  async function handleHotelBooking(e, id) {

    e.preventDefault()
    setBook(true);

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    console.log({ ...userData, userId })

    try {
      const res = await fetch(`http://localhost/hoteles/${id}/book`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "Booked", userId, userData }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Something went wrong");
      }

      navigate(`/booked/${id}`);
    } catch (error) {
      console.error("Error booking hotel:", error);
    }
    setBook(false);
  }

  return (
    <>    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <Link
          to="../../"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>←</motion.span>
          <span className="ml-2">Back to all hotels</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay={false}
              infiniteLoop
              interval={5000}
              className="h-full"
            >
              {hotel.images && hotel.images.map((img, index) => (
                <motion.div
                  key={index}
                  className="h-64 sm:h-96 lg:h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={`http://localhost/${img}`} alt={hotel.name} className="object-cover w-full h-full" />
                </motion.div>
              ))}
            </Carousel>
          </div>

          <div className="p-6 lg:w-1/2 flex flex-col justify-between">
            <div>
              <motion.h1
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {hotel.name}
              </motion.h1>
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Star className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="text-gray-700 mr-2">4.8</span>
                <MapPin className="w-5 h-5 text-gray-500 mr-1" />
                <span className="text-gray-700">Central Location</span>
              </motion.div>
              <motion.p
                className="text-2xl font-semibold text-blue-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {hotel.price} <span className="text-base text-gray-600">per night</span>
              </motion.p>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {hotel.description}
              </motion.p>
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{hotel.phone}</span>
              </motion.div>
            </div>

            <Form onSubmit={(e) => handleHotelBooking(e, hotel._id)} >
              <h2 className="text-xl font-semibold mb-4">Your details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <label htmlFor="checkin" className="mb-1 flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    className="border rounded-md p-2"
                    value={checkinDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                  />
                  <span className="text-sm text-gray-500 mt-1">{formatDate(checkinDate)}</span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="guest" className="mb-1 flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guest"
                    name="guest"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    min="1"
                    max="10"
                    className="border rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="bookedFor" className="mb-1 flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    Booked for
                  </label>
                  <input
                    type="text"
                    id="bookedFor"
                    name="bookedFor"
                    defaultValue={userName}
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex items-center mb-6">
                <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">Free cancellation</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={book}
                  // onClick={(e) => handleHotelBooking(e, hotel._id)}
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out ${book ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {book ? "Booking..." : "Book Now && Pay at hotel"}
                </motion.button>
                <Link
                  to="../../hotels"
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  View more hotels
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </motion.div>
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

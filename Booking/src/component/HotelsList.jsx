import { Link, json, useLoaderData } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useContext } from "react";
import { FaPhoneAlt, FaEye } from "react-icons/fa";
import { motion } from 'framer-motion';

import HotelContext from "../context/hotelContext";

export default function HotelsList() {
  const data = useLoaderData();
  const hoteles = data && data.hoteles;

  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-150 p-6 sm:p-8 md:p-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hoteles.map((hotel) => (
            <motion.li
              key={hotel.id}
              className="bg-gray-700 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-64 sm:h-72 lg:h-80">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={true}
                  autoPlay
                  infiniteLoop
                  className="h-full"
                >
                  {hotel.images.map((img, index) => (
                    <div key={index} className="h-full">
                      <img
                        src={`http://localhost/${img}`}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="p-6 space-y-4 mt-40">
                <h3 className="text-2xl font-bold text-yellow-300">
                  {hotel.name}
                </h3>
                <p className="text-lg text-gray-300">
                  <span className="text-yellow-300 font-semibold">{`$${hotel.price}`}</span>{" "}
                  per night
                </p>
                <motion.button
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhoneAlt className="mr-2" />
                  Book via Call
                </motion.button>
                <Link to={`/hoteles/${hotel.id}`} className="block w-full">
                  <motion.div
                    className="w-full bg-gray-600 text-yellow-300 font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </motion.div>
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch("http://localhost/hoteles/hotelesList");
    const resData = await response.json();

    if (!response.ok) {
      throw json(
        { message: "We couldn't find valid response " },
        { status: 500 }
      );
    }
    return resData;
  } catch (err) {
    throw new Error("Field to fetch list of hoteles.");
  }
}

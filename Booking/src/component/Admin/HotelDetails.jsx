import { motion } from "framer-motion";
import {
  FaPhone,
  FaMoneyBillWave,
  FaHotel,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HotelDetails({
  name,
  address,
  phone,
  price,
  type,
  images,
}) {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Booked Hotel</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaHotel className="text-blue-500 text-xl" />
          <p className="font-semibold">{name}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaMapMarkerAlt className="text-red-500 text-xl" />
          <p>{address}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaPhone className="text-green-500 text-xl" />
          <p>{phone}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaMoneyBillWave className="text-yellow-500 text-xl" />
          <p>Price: ${price}/night</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <FaHotel className="text-purple-500 text-xl" />
          <p>Type: {type}</p>
        </motion.div>
      </div>

      <div className="mt-6">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          className="rounded-lg overflow-hidden"
        >
          {images.map((img, imgIndex) => (
            <div key={imgIndex}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                alt={`Hotel image ${imgIndex + 1}`}
                className="object-cover h-64 w-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

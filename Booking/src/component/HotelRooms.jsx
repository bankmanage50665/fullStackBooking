import { useState } from "react";
import { json, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function HotelRooms() {
  const [book, setBook] = useState(null);
  const data = useLoaderData();
  const hotel = data && data.hotel;
  const navigate = useNavigate();

  async function handleHotelBooking(id) {
    setBook(true);
    try {
      const res = await fetch(`http://localhost/hoteles/${id}/book`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Booked" }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Something went wrong");
      }
      console.log("Booking response:", resData);


      navigate(`/booked/${id}`);
    } catch (error) {
      console.error("Error booking hotel:", error);
    }
    setBook(false);
  }

  return (
    <>
      <div className="mx-2 my-4">
        <div className="  flex items-center my-4">
          <Link
            to="../../"
            className="inline-block bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            Back to all hoteles
          </Link>
        </div>
        <li className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col  md:flex-row">
            <div className="w-1/2 h-full">
              <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay
                infiniteLoop
              >
                {hotel.images.map((img, index) => (
                  <div key={index}>
                    <img src={`http://localhost/${img}`} alt={hotel.name} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="p-6 md:w-1/2 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {hotel.name}
                </h3>
                <p className="text-lg mt-2">
                  <span className="font-bold text-gold-500">{`$${hotel.price}`}</span>{" "}
                  per night
                </p>
                <p className="text-gray-400 mt-2">{hotel.description}</p>
              </div>
              <div className="flex items-center mt-4">
                <button
                  disabled={book}
                  onClick={() => handleHotelBooking(hotel.id)}
                  className="px-4 py-2 mx-2 bg-orange-500 text-black font-semibold rounded-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  {book ? "Booking..." : " Book Now"}
                </button>
                <Link
                  to="edit"
                  className="px-4 py-2 mx-2 bg-orange-500 text-black font-semibold rounded-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Edit hoteles
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-10 text-gray-400 mb-4">
            <p>Check-in: {hotel.checkInTime}</p>
            <p>Check-out: {hotel.checkOutTime}</p>
          </div>
          <p className="text-gray-400 mx-10  mb-4">{hotel.phone}</p>
        </li>
      </div>
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

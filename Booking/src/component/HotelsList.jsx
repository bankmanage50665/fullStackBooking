import { Link, json, useLoaderData } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useContext } from "react";
import HotelContext from "../context/hotelContext";


export default function HotelsList() {
  const data = useLoaderData();
  const hoteles = data && data.hoteles;

  const {token} = useContext(HotelContext)
  
  return (
    <>
      <ul className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gradient-to-r from-gray-800 to-black p-8">
        {hoteles.map((hotel) => (
          <li
            key={hotel.id}
            className="flex items-center rounded-lg shadow-md overflow-hidden bg-black text-white"
          >
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
            <div className="w-1/2 p-6">
              <h3 className="text-xl font-semibold text-gold">{hotel.name}</h3>
              <p className="text-sm mt-2">
                <span className="text-gold font-bold">{`$${hotel.price}`}</span>{" "}
                per night
              </p>
              <div className="flex items-center mt-2">
                {/* <p className="text-sm">{hotel.address}</p> */}
              </div>
              <div className="flex items-center mt-4">
                {/* <p className="text-sm">{hotel.phone}</p> */}
              </div>
              <button className="mt-4 block w-full bg-gold text-wheat font-semibold rounded-md shadow py-2 px-4">
                Book via Call
                {/* <svg
                  className="w-5 h-5 text-gold mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21V5a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v16c0 1.1 .9 2 2 2zM16 11h-1a1 1 0 0 0-1-1v-3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1zM14 11h-1a1 1 0 0 0-1-1v-3a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1z"
                  />
                </svg> */}
              </button>
              <Link
                to={`/hoteles/${hotel.id}`}
                className="mt-4 block w-full bg-orange-300 text-black font-semibold rounded-md shadow py-2 px-4"
              >
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
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

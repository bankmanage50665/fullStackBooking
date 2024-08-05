import { json, useLoaderData, useParams } from "react-router-dom";
import HotelContext from "../context/hotelContext";
import { useContext, useEffect } from "react";

export default function BookedHotel() {
  const { handleSetHotelId, hotelId } = useContext(HotelContext);
  const data = useLoaderData();
  const hotel = data.hotel;

  useEffect(() => {
    handleSetHotelId(hotel.id);
  }, []);

  return (
    <>
      <ul className="hotel-card flex m-2 flex-col justify-between rounded-lg shadow-md overflow-hidden">
        <li className="hotel-image w-full h-48 bg-gray-200">
          <img
            src={`http://localhost/${hotel.images[0]}`}
            className="object-cover h-full w-full"
            alt="{hotel.name} Hotel"
          />
        </li>
        <li className="hotel-info p-6 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-700 text-white">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-semibold text-gray-300">
              Total Price: {hotel.price}
            </h2>
            <p className="text-sm text-gray-400">{hotel.status}</p>
          </div>
        </li>
        <li className="hotel-details p-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
          <p className="text-base font-medium">{hotel.type}</p>
          <p className="text-sm">{hotel.address}</p>
        </li>
      </ul>
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost/users/${id}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw json(
      { message: "Field to find hotel, Please try again later." },
      { status: 500 }
    );
  }
}

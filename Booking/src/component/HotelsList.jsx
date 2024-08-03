import { Link, json, useLoaderData } from "react-router-dom";

const hotels = [
  {
    name: "The Grand Hotel",
    address: "123 Main Street, New York, NY",
    price: 250,
    id: 1,
    images: [
      "https://media.gettyimages.com/id/1333257950/photo/digitally-rendered-image-of-a-five-star-hotel-interior.jpg?s=612x612&w=gi&k=20&c=bJrbUf1qRSC1pGi07sV3eWzHzMRS8ACg6awO76582HA=",
      "https://media.istockphoto.com/id/1319453433/photo/modern-luxury-house-with-private-infinity-pool-in-dusk.jpg?s=170667a&w=is&k=20&c=2q7Ag0AhSRZeInStx-oYDPg9xA08EGLoPsyKK4RPkQ0=",
      "https://t3.ftcdn.net/jpg/02/94/19/40/360_F_294194023_disE35GtlVLDQx4caNDaWewZI8LbxWFQ.jpg",
    ],
    phone: "(123) 456-7890",
  },
  {
    name: "The Plaza Hotel",
    address: "456 Fifth Avenue, New York, NY",
    price: 350,
    id: 2,
    images: ["image4.jpg", "image5.jpg", "image6.jpg"],
    phone: "(234) 567-8901",
  },
  {
    name: "The Ritz-Carlton",
    address: "789 Park Avenue, New York, NY",
    price: 450,
    id: 3,
    images: ["image7.jpg", "image8.jpg", "image9.jpg"],
    phone: "(345) 678-9012",
  },
  {
    name: "The Waldorf Astoria",
    address: "1011 Madison Avenue, New York, NY",
    price: 550,
    id: 4,
    images: ["image10.jpg", "image11.jpg", "image12.jpg"],
    phone: "(456) 789-0123",
  },
  {
    name: "The St. Regis",
    address: "1213 Fifth Avenue, New York, NY",
    price: 650,
    id: 5,
    images: ["image13.jpg", "image14.jpg", "image15.jpg"],
    phone: "(567) 890-1234",
  },
  {
    name: "The Carlyle",
    address: "1415 Madison Avenue, New York, NY",
    price: 750,
    id: 6,
    images: ["image16.jpg", "image17.jpg", "image18.jpg"],
    phone: "(678) 901-2345",
  },
  {
    name: "The Peninsula",
    address: "1617 Fifth Avenue, New York, NY",
    price: 850,
    id: 7,
    images: ["image19.jpg", "image20.jpg", "image21.jpg"],
    phone: "(789) 012-3456",
  },
  {
    name: "The Four Seasons",
    address: "1819 Park Avenue, New York, NY",
    price: 950,
    id: 8,
    images: ["image22.jpg", "image23.jpg", "image24.jpg"],
    phone: "(890) 123-4567",
  },
  {
    name: "The Mandarin Oriental",
    address: "2021 Fifth Avenue, New York, NY",
    price: 1050,
    id: 9,
    images: ["image25.jpg", "image26.jpg", "image27.jpg"],
    phone: "(901) 234-5678",
  },
  {
    name: "The Ritz-Carlton",
    address: "2223 Park Avenue, New York, NY",
    price: 1150,
    id: 10,
    images: ["image28.jpg", "image29.jpg", "image30.jpg"],
    phone: "(012) 345-6789",
  },
  // Add more hotels here
];

export default function HotelsList() {
  const data = useLoaderData();
  const hoteles = data &&  data.hoteles
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gradient-to-r from-gray-800 to-black p-8">
        {hoteles.map((hotel) => (
          <li
            key={hotel.id}
            className="flex items-center rounded-lg shadow-md overflow-hidden bg-black text-white"
          >
            <div className="w-1/2 h-full  relative overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover object-center"
                src={hotel.images} // Assuming the first image is the main one
                alt={hotel.name}
              />
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

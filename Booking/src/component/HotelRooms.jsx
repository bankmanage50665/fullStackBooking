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

export default function HotelRooms() {
  return (
    <>
      {hotels.map((hotel) => (
        <li
          key={hotel.id}
          class="bg-gray-900 rounded-lg shadow-md overflow-hidden"
        >
          <div class="flex flex-col  md:flex-row">
            <div class="md:w-1/2">
              <img
                class="w-full h-full object-cover"
                src={hotel.images[1]}
                alt={hotel.name}
              />
            </div>
            <div class="p-6 md:w-1/2 text-white flex flex-col justify-between">
              <div>
                <h3 class="text-2xl font-semibold text-white">{hotel.name}</h3>
                <p class="text-lg mt-2">
                  <span class="font-bold text-gold-500">{`$${hotel.price}`}</span>{" "}
                  per night
                </p>
                <p class="text-gray-400 mt-2">{hotel.description}</p>
              </div>
              <div class="flex items-center mt-4">
                <button class="px-4 py-2 bg-orange-500 text-black font-semibold rounded-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  Book Now
                </button>
                <div class="ml-4 text-gray-400">
                  <p>Check-in: {hotel.checkInTime}</p>
                  <p>Check-out: {hotel.checkOutTime}</p>
                </div>
              </div>
              <p class="text-gray-400 mt-4 text-right">{hotel.phone}</p>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

import {
  Form,
  useNavigation,
  useNavigate,
  useParams,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";


import ImageUpload from "../shared/component/ImageUpload";


export default function EditHoteles() {
  const [files, setFiles] = useState();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmiting = navigation.state === "submitting";
  const sp = useParams();
  const hotelId = sp.id;
  const hotel = useLoaderData().hotel;
  const token = useRouteLoaderData("root")

  function handleGetImg(img) {
    setFiles(img);
  }


  async function handleUpdateHotel(e) {
    e.preventDefault();
    const formData = new FormData();
    const formElement = e.target.elements;
    const hotelData = {
      name: formElement.name.value,
      address: formElement.address.value,
      price: formElement.price.value,
      images: formElement.images.value,
      phone: formElement.phone.value,
      type: formElement.type.value,
      status: formElement.status.value,
    };

    formData.append("name", hotelData.name);
    formData.append("address", hotelData.address);
    formData.append("price", hotelData.price);
    formData.append("phone", hotelData.phone);
    formData.append("type", hotelData.type);
    formData.append("status", hotelData.status);
    Array.from(files.map((img) => formData.append("images", img)));

    const response = await fetch(`http://localhost/hoteles/${hotelId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message);
    }
    navigate(`/hoteles/${hotelId}`);
  }

  async function deleteHotel(id) {
    const response = await fetch(`http://localhost/hoteles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const resData = await response.json();

    console.log(resData)
    if (!response.ok) {
      throw new Error(resData.message);
    }

    navigate("/");
  }

  return (
    <>
      {hotel ? (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Edit hoteles</h2>
          <Form onSubmit={handleUpdateHotel}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Hotel Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={hotel && hotel.name}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                defaultValue={hotel && hotel.address}
                name="address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={hotel && hotel.price}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <ImageUpload getAllFiles={handleGetImg} />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone no
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                defaultValue={hotel && hotel.phone}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Select Type
              </label>
              <select id="type">
                <option value="hotel">Hotel</option>
                <option value="gest">Gest house</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                Select status
              </label>
              <select id="status">
                <option value="unbook">Unbooked</option>
                <option value="book">Booked</option>
              </select>
            </div>

            <button
              disabled={isSubmiting}
              type="submit"
              className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
            >
              {isSubmiting ? "Updating..." : "  Update Hotels"}
            </button>
          </Form>
          <div>
            <button
              disabled={isSubmiting}
              onClick={() => deleteHotel(hotel.id)}
              type="submit"
              className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
            >
              {isSubmiting ? "Updating..." : "Delete Hotels"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center text-2xl font-bold">loading</div>
        </div>
      )}
    </>
  );
}

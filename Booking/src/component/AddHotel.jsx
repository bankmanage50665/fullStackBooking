import { Form, useNavigate, json, useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserId } from "../middleware/getToken";

import ImageUpload from "../shared/component/ImageUpload";
import LoadingComponent from "../shared/component/LoadingComponent";

export default function AddHoteles() {
  const [isSubmiting, setIsSubmiting] = useState(null);
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const userid = getUserId();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (token === null || !token) {
      navigate("/login");
    }
  }, [token]);

  function handleGetFiles(files) {
    setFiles(files);
  }

  async function handleAddHoteles(e) {
    setIsSubmiting(true);
    e.preventDefault();
    const formData = new FormData();
    const formElement = e.target.elements;
    const hotelData = {
      name: formElement.name.value,
      address: formElement.address.value,
      price: formElement.price.value,

      phone: formElement.phone.value,
      type: formElement.type.value,
    };
    formData.append("name", hotelData.name);
    formData.append("address", hotelData.address);
    formData.append("price", hotelData.price);
    formData.append("phone", hotelData.phone);
    formData.append("creator", userid);
    formData.append("type", hotelData.type);
    Array.from(files.map((img) => formData.append("images", img)));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hoteles/add`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        setIsSubmiting(false);
        throw json({ message: resData.message }, { status: 500 });
      }
    } catch (err) {
      throw new Error("Field to adding hotel, Please try again later.", 500);
    }

    navigate("/");
    setIsSubmiting(false);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Add your Hoteles
        </h2>
        <Form onSubmit={handleAddHoteles}>
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
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone no
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ImageUpload getAllFiles={handleGetFiles} />

          <button
            disabled={isSubmiting}
            type="submit"
            className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
          >
            {isSubmiting ? <LoadingComponent /> : "Add Hotels"}
          </button>
        </Form>
      </div>
    </>
  );
}

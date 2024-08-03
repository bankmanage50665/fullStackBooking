import { Link, Form, useNavigation, useNavigate, json } from "react-router-dom";
export default function AddHoteles() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmiting = navigation.state === "submitting";

  async function handleAddHoteles(e) {
    e.preventDefault();
    const formData = new FormData();
    const formElement = e.target.elements;
    const hotelData = {
      name: formElement.name.value,
      address: formElement.address.value,
      price: formElement.price.value,
      images: formElement.images.value,
      phone: formElement.phone.value,
    };

    const res = await fetch("http://localhost/hoteles/add", {
      method: "POST",
      body: JSON.stringify(hotelData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    if (!res.ok) {
      throw json({ message: resData.message }, { status: 500 });
    }

    navigate("/");
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
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
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Hotel Images
            </label>
            <input
              type="text"
              id="images"
              name="images"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

          <button
            disabled={isSubmiting}
            type="submit"
            className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
          >
            Add Hotels
          </button>
        </Form>
      </div>
    </>
  );
}

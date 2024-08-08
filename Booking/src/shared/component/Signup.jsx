import React, { useContext, useEffect } from "react";
import { Form, json, Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import HotelContext from "../../context/hotelContext"

export default function SignupForm() {


  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate()

  const { handleSetUserId, handleSetToken } = useContext(HotelContext)



  async function handleSignup(e) {
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    try {
      const response = await fetch(`http://localhost/users/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {

          'Content-Type': 'application/json'
        }
      })

      const resData = await response.json()


      if (!response.ok) {
        throw json(
          { message: resData.message || "Field to create new user. " },
          { status: 500 }
        );
      }
      handleSetUserId(resData.userId)
      handleSetToken(resData.token)

      navigate("/login");
    } catch (err) {
      throw json({ message: "Field to create new user" }, { status: 500 })
    }

  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          disabled={isSubmiting}
          type="submit"
          className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
        >
          {isSubmiting ? "Signing up" : "Sign Up"}
        </button>
        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const userData = {
//     name: formData.get("name"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   try {
//     const response = await fetch(`http://localhost/users/signup`, {
//       method: 'POST',
//       body: JSON.stringify(userData),
//       headers: {

//         'Content-Type': 'application/json'
//       }
//     })

//     const resData = await response.json()


//     if (!response.ok) {
//       throw json(
//         { message: resData.message || "Field to create new user. " },
//         { status: 500 }
//       );
//     }
//     return redirect("/login");
//   } catch (err) {
//     throw json({ message: "Field to create new user." }, { status: 500 });
//   }
// }

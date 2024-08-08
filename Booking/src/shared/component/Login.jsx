import {
  Form,
  Link,
  json,
  redirect,
  useNavigation,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import React, { useContext } from "react";

import HotelContext from "../../context/hotelContext";

function LoginForm() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate()
  const { handleSetUserId, handleSetToken } = useContext(HotelContext)




  async function handleLogin(e) {
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    try {
      const response = await fetch(`http://localhost/users/login`, {
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
      navigate("/");
    } catch (err) {
      throw json({ message: "Field to create new user" }, { status: 500 })
    }

  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
      <Form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-black font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>
        <button
          disabled={isSubmiting}
          type="submit"
          className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-gray-800"
        >
          {isSubmiting ? "Loging..." : "Login"}
        </button>
        <p className="text-center mt-4 text-black">
          Don't have an account?
          <Link to="/signup" className="text-black">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;

// export async function action({ request }) {
//   const formData = await request.formData();
//   const userData = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   const response = await fetch("http://localhost/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   const resData = await response.json();

//   console.log(resData)

//   if (!response.ok) {
//     throw json(
//       { message: resData.message || "Field to login user." },
//       { status: 500 }
//     );
//   }

//   return redirect("/");
// }

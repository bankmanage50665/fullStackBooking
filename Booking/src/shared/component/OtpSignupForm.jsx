import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { Form, Link, json, redirect, useNavigation } from "react-router-dom";
import React from "react";
import { PulseLoader } from "react-spinners";

const inputClasses =
  "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ease-in-out";
const labelClasses =
  "block text-gray-700 font-bold mb-2 transition-all duration-300 ease-in-out";

function OtpSignupForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Register
          </h2>
          <Form method="post">
            <div className="mb-6">
              <label htmlFor="phone" className={labelClasses}>
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                id="phone"
                inputMode="numeric"
                name="phone"
                required
                minLength={10}
                maxLength={10}
                className={inputClasses}
                placeholder="Enter your phone number"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 ease-in-out"
            >
              {isSubmitting ? (
                <PulseLoader color="#ffffff" size={10} />
              ) : (
                "Register"
              )}
            </motion.button>
          </Form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default OtpSignupForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const userData = {
    name: formData.get("name"),
    phoneNumber: formData.get("phone"),
  };

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/otp/register`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();

    

    if (!res.ok) {
      throw new Error(resData.message || "Field to loging user.");
    }
  } catch (err) {
    throw json(
      { message: "Field to login  please try again later." },
      { status: 500 }
    );
  }
  return redirect("/login");
}

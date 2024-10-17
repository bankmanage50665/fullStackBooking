import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaLock } from "react-icons/fa";
import {
  json,
  redirect,
  Form,
  useNavigation,
  useActionData,
  Link,
} from "react-router-dom";
import { PulseLoader } from "react-spinners";


const OtpLoginForm = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();



  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/otp/sendotp`,
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
        throw new Error(resData.message || "Failed to send OTP.");
      }
      setStep(2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw json(
        { message: "Failed to send OTP. Please try again later." },
        { status: 500 }
      );
    }
  };

  function handleGoLoginPage() {
    setStep(1);
  }

  const inputClasses =
    "w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-600";
  const buttonClasses =
    "w-full px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Login with OTP
          </h2>
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label htmlFor="phoneNumber" className={labelClasses}>
                  <FaPhone className="inline mr-2" />
                  Enter Mobile Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
                  <span className="text-gray-600 font-semibold pl-4 mr-2">
                    +91
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${inputClasses} border-0`}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className={buttonClasses}
              >
                {loading ? (
                  <PulseLoader color="#ffffff" size={10} />
                ) : (
                  "Send OTP"
                )}
              </motion.button>

              <div className="text-center text-sm text-gray-600">
                Not registered yet?{" "}
                <Link
                  to="/signup"
                  className="text-yellow-600 hover:text-yellow-700 font-medium transition-all"
                >
                  Register here
                </Link>
              </div>
            </form>
          ) : (
            <Form method="post" action="/login" className="space-y-6">
              {data && data.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md"
                >
                  {data.message}
                </motion.div>
              )}

              <input type="hidden" name="phoneNumber" value={phoneNumber} />

              <div>
                <label htmlFor="otp" className={labelClasses}>
                  <FaLock className="inline mr-2" />
                  Enter OTP
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  id="otp"
                  type="number"
                  name="otp"
                  className={inputClasses}
                  placeholder="Enter your OTP"
                  required
                  minLength={4}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className={buttonClasses}
              >
                {isSubmitting ? (
                  <PulseLoader color="#ffffff" size={10} />
                ) : (
                  "Verify OTP"
                )}
              </motion.button>

              <div className="text-center text-sm text-gray-600">
                Not registered yet?{" "}
                <Link
                  to="/signup"
                  className="text-yellow-600 hover:text-yellow-700 font-medium transition-all"
                >
                  Register here
                </Link>
              </div>

              <motion.button
                onClick={handleGoLoginPage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 border border-yellow-600 rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all"
              >
                Go to Login Page
              </motion.button>
            </Form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OtpLoginForm;

export async function loginAction({ request, params }) {
  const formData = await request.formData();
  const userData = {
    otp: formData.get("otp"),
    phoneNumber: formData.get("phoneNumber"),
  };

  // Uncomment this section when ready to implement OTP verification

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/otp/verify`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404 || response.status === 401) {
      return response;
    }

    const resData = await response.json();



    const token = resData.token;

   

    localStorage.setItem("token", resData.token);
    localStorage.setItem("userid", resData.userId);
    localStorage.setItem("phoneNumber", resData.phoneNumber);

    if (!response.ok) {
      throw new Error(resData.message || "Failed to login user.");
    }
  } catch (err) {
    throw json(
      { message: "Failed to login. Please try again later." },
      { status: 500 }
    );
  }

  return redirect("/");
}

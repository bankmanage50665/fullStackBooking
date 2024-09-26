import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaLock } from 'react-icons/fa';
import {  json, Form, redirect } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const OtpLoginForm = () => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userOtp, setUserOtp] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true)
        // Add your OTP sending logic here
        const formData = new FormData(e.target)


        const userData = Object.fromEntries(formData.entries())




        try {

            const res = await fetch("http://localhost:80/otp/sendotp", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await res.json();

            console.log(resData)

            if (!res.ok) {
                throw new Error(resData.message || "Field to loging user.");
            }
            setStep(2)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            throw json(
                { message: "Field to login  please try again later." },
                { status: 500 }
            );
        }

    };



    const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
    const buttonClasses = "w-full py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 ease-in-out";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login with OTP</h2>
                    {step === 1 ? (
                        <form onSubmit={handleSendOtp}>
                            <div className="mb-6">
                                <label htmlFor="phoneNumber" className={labelClasses}>
                                    <FaPhone className="inline mr-2" />
                                    Enter Mobile Number
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
                                    <span className="text-gray-600 font-semibold pl-4 mr-2">+91</span>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        id="phoneNumber"
                                        type="tel"
                                        name="phoneNumber"
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
                                    "Send  OTP"
                                )}
                            </motion.button>
                        </form>
                    ) : (
                        <Form method='post'>
                            <div className="mb-6">
                                <input
                                    type='hidden'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                />
                                <label htmlFor="otp" className={labelClasses}>
                                    <FaLock className="inline mr-2" />
                                    Enter OTP
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    id="otp"
                                    type="number"
                                    name="otp"
                                    onChange={(e) => setUserOtp(e.target.value)}
                                    className={inputClasses}
                                    value={userOtp}
                                    placeholder="Enter your OTP"
                                    required
                                />
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
                                    "Verify OTP"
                                )}
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
    const formData = await request.formData()
    const userData = {
        phoneNumber: formData.get("phoneNumber"),
        otp: formData.get("otp"),
    }


    console.log(userData)


    try {
        const res = await fetch("http://localhost:80/otp/verify", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await res.json();
        console.log(resData.token)

        localStorage.setItem("token", resData.token)
        localStorage.setItem("userid", resData.userId)
        localStorage.setItem("unserName", resData.userName)
        console.log(resData)

        if (!res.ok) {
            throw new Error(resData.message || "Field to loging user.");
        }


    } catch (err) {

        throw json(
            { message: "Field to login  please try again later." },
            { status: 500 }
        );
    }

    return redirect("/")

}
import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import MainNavigation from "../Navigation/MainNavigation";
import Footer from "../Navigation/Footer";

const ErrorHandler = () => {
  const errData = useRouteError();
  const errorMessage =
    (errData.data && errData.data.message) || "Oops! Something went wrong.";
  const statusCode = errData.status || "Unknown";

  return (
    <>
      <MainNavigation />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg p-8 text-center">
          <AlertTriangle className="mx-auto text-yellow-500 h-16 w-16 mb-6" />
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            {errorMessage}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            We apologize for the inconvenience. Our team has been notified and
            is working on resolving this issue.
          </p>
          <p className="text-md text-gray-400 mb-8">
            Error Code:
            <span className="font-semibold text-gray-200">{statusCode}</span>
          </p>
          <Link
            to=""
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorHandler;

import { NavLink, useRouteLoaderData, Form } from "react-router-dom";

import { SiGnuprivacyguard } from "react-icons/si";
import { FaHotel } from "react-icons/fa6";
import { BiHotel } from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import { LogOut } from "lucide-react";

import { getUserId } from "../../middleware/getToken";

export default function Footer() {
  const token = useRouteLoaderData("root");
  const userId = getUserId();

  return (
    <>
      <div className="h-16" /> {/* Spacer to prevent content overlap */}
      <footer className="w-full h-16 fixed bottom-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
        <div className="max-w-screen-xl mx-auto h-full flex justify-evenly items-center">
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
            end
          >
            <FaHotel className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Hotels</span>
          </NavLink>

          {token && userId && (
            <NavLink
              to={`/booked/${userId}`}
              className={({ isActive }) =>
                `relative flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
              end
            >
              <div className="relative">
                <BiHotel className="h-5 w-5 mb-1" />
              </div>
              <span className="text-xs font-medium">My Hotels</span>
            </NavLink>
          )}

          {!token && (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
              end
            >
              <SiGnuprivacyguard className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Signup</span>
            </NavLink>
          )}

          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
              end
            >
              <FaSignInAlt className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Login</span>
            </NavLink>
          )}

          {token && (
            <Form method="post" action="/logout" className="text-gray-400">
              <button className="flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white">
                <LogOut className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Logout</span>
              </button>
            </Form>
          )}
        </div>
      </footer>
    </>
  );
}

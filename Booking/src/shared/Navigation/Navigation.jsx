import React, { useState } from "react";
import { NavLink, Form } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHotel,
  FaBookmark,
  FaUserPlus,
  FaSignInAlt,
  FaPlusCircle,
  FaUserShield,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { getCreator } from "../../middleware/getToken";

const Navigation = ({ token, userid }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const creatorId = getCreator();
  const isAdmin = userid === creatorId;

  const navItems = [
    { to: "/", icon: FaHotel, text: "Hotels", alwaysShow: true },
    {
      to: `/booked/${userid}`,
      icon: FaBookmark,
      text: "My Hotels",
      showWhen: token && userid,
    },
    { to: "/signup", icon: FaUserPlus, text: "Signup", showWhen: !token },
    { to: "/login", icon: FaSignInAlt, text: "Login", showWhen: !token },
    {
      to: "/hoteles/add",
      icon: FaPlusCircle,
      text: "Add Hotel",
      showWhen: isAdmin,
    },
    { to: "/admin", icon: FaUserShield, text: "Admin", showWhen: isAdmin },
  ];

  const renderNavItem = (item) => {
    if (!item.alwaysShow && !item.showWhen) return null;

    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center space-x-2 px-4 py-2 rounded-md transition duration-300 ${
            isActive
              ? "bg-yellow-400 text-gray-900 font-bold"
              : "text-white hover:bg-gray-700"
          }`
        }
        end
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2"
        >
          <item.icon />
          <span>{item.text}</span>
        </motion.div>
      </NavLink>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaHotel className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(renderNavItem)}
              {token && (
                <Form method="post" action="/logout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </motion.button>
                </Form>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(renderNavItem)}
            {token && (
              <Form method="post" action="/logout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-md text-white hover:bg-gray-700 transition duration-300"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.button>
              </Form>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

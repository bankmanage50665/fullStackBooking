import { NavLink } from "react-router-dom";
export default function MainNavigation() {
  return (
    <>
      <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-gold font-bold border-b-2 border-gold"
                  : "hover:text-gold transition duration-300"
              }
            >
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-gold font-bold border-b-2 border-gold"
                  : "hover:text-gold transition duration-300"
              }
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-gold font-bold border-b-2 border-gold"
                  : "hover:text-gold transition duration-300"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

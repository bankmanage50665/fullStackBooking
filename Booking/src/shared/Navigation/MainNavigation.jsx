import { NavLink, useNavigate } from "react-router-dom";
import HotelContext from "../../context/hotelContext";
import { useContext } from "react";
export default function MainNavigation() {
  const { hotelId, token, handleLogout } = useContext(HotelContext);
  const navigate = useNavigate()



  function handleLogoutUser() {
    handleLogout()
    navigate('/')

  }

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
          {!token && <li>
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
          </li>}
          {!token && <li>
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
          </li>}
          {token && <li>
            <button

              // className={({ isActive }) =>
              //   isActive
              //     ? "text-gold font-bold border-b-2 border-gold"
              //     : "hover:text-gold transition duration-300"
              // }
              onClick={handleLogoutUser}
            >
              Logout
            </button>
          </li>}
          <li>
            <NavLink
              to="/hoteles/add"
              className={({ isActive }) =>
                isActive
                  ? "text-gold font-bold border-b-2 border-gold"
                  : "hover:text-gold transition duration-300"
              }
            >
              Add Hotel
            </NavLink>
          </li>

          {hotelId && token && (
            <li>
              <NavLink
                to={`/booked/${hotelId}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-gold font-bold border-b-2 border-gold"
                    : "hover:text-gold transition duration-300"
                }
              >
                My hoteles
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

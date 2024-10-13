import { NavLink, useRouteLoaderData, Link, Form } from "react-router-dom";

import { getUserId } from "../../middleware/getToken";
export default function MainNavigation() {
  const userid = getUserId();
  const token = useRouteLoaderData("root");

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
          {!token && (
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
          )}
          {!token && (
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
          )}
          {token && (
            <li>
              <Form
                method="post"
                action="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "text-gold font-bold border-b-2 border-gold"
                    : "hover:text-gold transition duration-300"
                }
              >
                <button>Logout</button>
              </Form>
            </li>
          )}
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

          {token && (
            <li>
              <NavLink
                to={`/booked/${userid}`}
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

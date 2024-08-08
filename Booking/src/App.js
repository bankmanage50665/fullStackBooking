import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./shared/component/Signup";
import LoginForm from "./shared/component/Login";
import AddHoteles from "./component/AddHotel";
import AddRooms from "./component/AddRooms";
import HotelsList, { loader as hotelListLoader } from "./component/HotelsList";
import HotelRooms, { loader as hotelRoomLoader } from "./component/HotelRooms";
import RootLayout from "./shared/Navigation/RootLayout";
import EditHoteles from "./component/EditHoteles";
import BookedHotel, {
  loader as bookedHotelLoader,
} from "./component/BookedHotel";
import { HotelContextProvider } from "./context/hotelContext";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,

    children: [
      { index: true, element: <HotelsList />, loader: hotelListLoader },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <LoginForm /> },
      {
        path: "hoteles",
        children: [
          { path: "add", element: <AddHoteles /> },
          {
            path: ":id",

            children: [
              { index: true, element: <HotelRooms />, loader: hotelRoomLoader },
              {
                path: "edit",
                element: <EditHoteles />,
                loader: hotelRoomLoader,
              },
            ],
          },
        ],
      },
      {
        path: "booked/:id",
        element: <BookedHotel />,
        loader: bookedHotelLoader,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <HotelContextProvider>
        <RouterProvider router={router} />;
      </HotelContextProvider>
    </>
  );
}

reportWebVitals();
export default App;

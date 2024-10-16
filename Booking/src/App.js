import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddHoteles from "./component/AddHotel";
import HotelsList, { loader as hotelListLoader } from "./component/HotelsList";
import HotelRooms, { loader as hotelRoomLoader } from "./component/HotelRooms";
import RootLayout from "./shared/Navigation/RootLayout";
import EditHoteles from "./component/EditHoteles";
import BookedHotel, {
  loader as bookedHotelLoader,
} from "./component/BookedHotel";
import { HotelContextProvider } from "./context/hotelContext";
import OtpSignupForm, {
  action as signupAction,
} from "./shared/component/OtpSignupForm";
import OtpLoginForm, { loginAction } from "./shared/component/OtpLoginForm";
import { tokenLoader, checkAuthLoader } from "./middleware/getToken";
import { logoutAction } from "./middleware/logout";
import GetAllBooking, {
  loader as adminLoader,
} from "./component/Admin/ManageBooking";
import Error from "./shared/component/Error";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: tokenLoader,
    id: "root",

    children: [
      { index: true, element: <HotelsList />, loader: hotelListLoader },
      { path: "signup", element: <OtpSignupForm />, action: signupAction },
      { path: "login", element: <OtpLoginForm />, action: loginAction },
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
      { path: "logout", action: logoutAction },
      { path: "admin", element: <GetAllBooking />, loader: adminLoader },
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

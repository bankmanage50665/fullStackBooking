import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup, { action as signupAction } from "./shared/component/Signup";
import LoginForm, { action as loginAction } from "./shared/component/Login";
import AddHoteles from "./component/AddHotel";
import AddRooms from "./component/AddRooms";
import HotelsList from "./component/HotelsList";
import HotelRooms from "./component/HotelRooms";
import RootLayout from "./shared/Navigation/RootLayout";


const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <HotelsList /> },
      { path: "signup", element: <Signup />, action: signupAction },
      { path: "login", element: <LoginForm />, action: loginAction },
      {
        path: "hoteles",
        children: [
          { path: "add", element: <AddHoteles /> },
          { path: "add", element: <AddRooms /> },
          { path: ":id", element: <HotelRooms /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

reportWebVitals();
export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./shared/component/Signup";
import LoginForm, { action as loginAction } from "./shared/component/Login";
import AddHoteles from "./component/AddHotel";
import AddRooms from "./component/AddRooms";

const router = createBrowserRouter([
  {
    path: "",
    children: [
      { index: true, element: <AddRooms /> },
      { path: "login", element: <LoginForm />, action: loginAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

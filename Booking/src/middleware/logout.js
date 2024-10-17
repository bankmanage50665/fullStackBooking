import { redirect } from "react-router-dom";

export function logoutAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("creator");

  return redirect("/");
}

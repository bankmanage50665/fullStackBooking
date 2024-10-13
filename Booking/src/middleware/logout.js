import { redirect } from "react-router-dom";

export function logoutAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("unserName");
  localStorage.removeItem("phoneNumber");

  return redirect("/");
}

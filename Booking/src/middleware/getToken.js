import { redirect } from "react-router-dom";

export function getToken(req, res, next) {
  const token = localStorage.getItem("token");
  return token;
}

export function getUserId(req, res, next) {
  const userid = localStorage.getItem("userid");
  return userid;
}

export function tokenLoader(req, res, next) {
  return getToken();
}

export function getUserName(req, res, next) {
  const name = localStorage.getItem("unserName");
  return name;
}
export function getPhoneNumber(req, res, next) {
  const phoneNumber = localStorage.getItem("phoneNumber");
  return phoneNumber;
}

export function getCreator() {
  const creatorId = localStorage.getItem("creator");

  return creatorId;
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/login");
  }

  return null;
}

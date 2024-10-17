import { useRouteLoaderData } from "react-router-dom";

import { getUserId } from "../../middleware/getToken";
import Navigation from "./Navigation";
export default function MainNavigation() {
  const userid = getUserId();
  const token = useRouteLoaderData("root");

  return (
    <>
      <Navigation token={token} userid={userid} />
    </>
  );
}

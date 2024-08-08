import { createContext, useState } from "react";

const HotelContext = createContext({
  hotelId: "",
  userId: "",
  handleSetHotelId: (id) => { },
  handleSetUserId: (id) => { },
  token: "",
  handleSetToken: (token) => { },
  handleLogout: () => { },
});

export const HotelContextProvider = ({ children }) => {
  const [hotelId, setHotelId] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  function handleSetHotelId(id) {
    setHotelId(id);
  }
  function handleSetUserId(id) {
    setUserId(id)
  }

  function handleSetToken(token) {
    setToken(token)
  }
  function handleLogout() {
    setToken(null)
  }

  const HotelCtx = {
    hotelId,
    userId,
    handleSetHotelId,
    handleSetUserId,
    token,
    handleSetToken,
    handleLogout
  };

  return (
    <HotelContext.Provider value={HotelCtx}>{children}</HotelContext.Provider>
  );
};

export default HotelContext;

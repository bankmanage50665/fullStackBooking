import { createContext, useState } from "react";

const HotelContext = createContext({
  hotelId: "",
  handleSetHotelId: (id) => {},
});

export const HotelContextProvider = ({ children }) => {
  const [hotelId, setHotelId] = useState("");

  function handleSetHotelId(id) {
    setHotelId(id);
  }

  const HotelCtx = {
    hotelId,
    handleSetHotelId,
  };

  return (
    <HotelContext.Provider value={HotelCtx}>{children}</HotelContext.Provider>
  );
};

export default HotelContext;

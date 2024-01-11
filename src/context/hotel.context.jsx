import { createContext, useContext, useState } from "react";

export const HotelContext = createContext({
  isNewHotelAdding: false,
});
export const useHotelContext = () => useContext(HotelContext);

export const HotelContextProvider = ({ children }) => {
  const [isNewHotelAdding, setIsNewHotelAdding] = useState(false);

  return (
    <HotelContext.Provider value={{ isNewHotelAdding, setIsNewHotelAdding }}>
      {children}
    </HotelContext.Provider>
  );
};

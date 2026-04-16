import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const Context = ({ children }) => {
  const [period, setPeriod] = useState("day");

  const [doctorDetails, setDoctorDetails] = useState(() => {
    try {
      const stored = localStorage.getItem("doctorDetails");
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Invalid JSON in localStorage", error);
      return {};
    }
  });

  return (
    <StoreContext.Provider
      value={{ period, setPeriod, doctorDetails, setDoctorDetails }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

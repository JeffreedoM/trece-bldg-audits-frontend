import { useContext } from "react";
import { BuildingsContext } from "../contexts/BuildingsContext";

export const useBuildingsContext = () => {
  const context = useContext(BuildingsContext);

  if (!context) {
    throw Error(
      "useBuildingsContext must be used inside BuildingsContextProvider",
    );
  }

  return context;
};

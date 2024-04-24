import { createContext, useReducer } from "react";

export const BuildingContext = createContext({});

export const buildingReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUILDING":
      return {
        building: action.payload,
      };
    case "DELETE_BUILDING":
      return {
        buildings: state.buildings.filter(
          (building) => building._id !== action.payload._id,
        ),
      };

    default:
      return state;
  }
};

type BuildingsContextProviderProps = {
  children: React.ReactNode;
};

export const BuildingContextProvider = ({
  children,
}: BuildingsContextProviderProps) => {
  const [state, dispatch] = useReducer(buildingReducer, { building: null });

  return (
    <BuildingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BuildingContext.Provider>
  );
};

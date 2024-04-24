import { createContext, useReducer } from "react";

export const BuildingsContext = createContext({});

export const buildingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUILDINGS":
      return {
        buildings: action.payload,
      };
    case "CREATE_BUILDINGS":
      console.log(...state.buildings);
      return {
        buildings: [action.payload, ...state.buildings],
      };
    case "DELETE_BUILDINGS":
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

export const BuildingsContextProvider = ({
  children,
}: BuildingsContextProviderProps) => {
  const [state, dispatch] = useReducer(buildingsReducer, {
    buildings: null,
  });

  return (
    <BuildingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BuildingsContext.Provider>
  );
};

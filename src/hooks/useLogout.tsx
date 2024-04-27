import { useAuthContext } from "./useAuthContext";
// import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logout = () => {
    // remove use from local storage
    localStorage.removeItem("user");

    // dispatch logout function
    dispatch({ type: "LOGOUT" });

    // set workouts to null
    // workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};

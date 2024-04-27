import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../../api/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("user/login", { username, password })
      .then((response) => {
        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      })
      .catch((err) => {
        const { error } = err.response.data;
        setError(error);
        setIsLoading(false);
      });
  };

  return { login, isLoading, error };
};

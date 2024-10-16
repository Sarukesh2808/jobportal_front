import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, blockChainAddress) => {
    setLoading(true);
    setError(null);

    const response = await fetch("https://jobportal-6057.onrender.com/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        blockChainAddress,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }

    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { signup, loading, error };
};

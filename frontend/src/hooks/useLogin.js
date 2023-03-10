import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();
  const url = "http://localhost:4000/login";

  const login = async (email, password) => {
    setIsPending(true);

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsPending(false);
      console.log("login");
    } else {
      setError(data.error);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};

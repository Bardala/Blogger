import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const url = "http://localhost:4000/signup";

  const signup = async (email, password) => {
    setIsPending(true);

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsPending(false);
      console.log("signup");
    } else {
      setError(data.error);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};

import { useState } from "react";
import { useBlogContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const url = "http://localhost:4000/signup";

  const signup = async (username, email, password) => {
    setIsPending(true);

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
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

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBlogs } = useBlogContext();
  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchBlogs({ type: "GET-ALL-BLOGS", payload: null });
  };
  return { logout };
};

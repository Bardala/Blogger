import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  //   const { user } = useAuthContext();

  const getUsers = async (user) => {
    setIsPending(true);

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        console.log(data);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  };

  return { users, isPending, error, getUsers };
};

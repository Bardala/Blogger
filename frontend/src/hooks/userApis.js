import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetUser = (username) => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [pageOwner, setPageOwner] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setIsPending(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setPageOwner(data);
          console.log(data);
        } else {
          setError(data.error);
          console.log(data);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsPending(false);
    };

    if (user) getUser();
  }, [user, username]);

  return { isPending, error, pageOwner };
};

export const useGetAllUsers = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
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

    if (user) getUsers();
  }, [user]);

  return { users, isPending, error };
};

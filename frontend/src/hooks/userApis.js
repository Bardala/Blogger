import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetUser = (username) => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [orderedUser, setOrderedUser] = useState(null);

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
          setOrderedUser(data);
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

  return { isPending, error, orderedUser };
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

export const usePutFollower = (username) => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  console.log(username);

  const followUser = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${username}/follow`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const data = await response.json();
      console.log(response);
      console.log(data?.error);

      if (!response.ok) throw Error(response.statusText);
      window.location.reload(true);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  };

  return { isPending, error, followUser };
};

export const useUnfollowUser = (username) => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  async function unfollowUser() {
    setIsPending(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${username}/unfollow`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);

      if (!response.ok) throw Error(response.statusText);
      window.location.reload(true);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  }

  return { isPending, error, unfollowUser };
};

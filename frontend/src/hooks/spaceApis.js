import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useBlogContext } from "./useBlogContext";

export const useGetDefaultSpace = () => {
  const { user } = useAuthContext();
  const { dispatch, blogs } = useBlogContext();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      if (!user) {
        setError("You must me logged in");
        return;
      }
      setIsPending(true);
      try {
        const response = await fetch(
          "http://localhost:4000/api/getDefaultSpace",
          {
            headers: { Authorization: `Bearer ${user.token}` },
            mode: "cors",
          },
        );
        if (!response.ok) {
          setError(response.error);
        }
        const space = await response.json();
        const blogs = space.blogs;
        dispatch({ type: "GET-ALL-BLOGS", payload: blogs });
      } catch (error) {
        setError("Connection Error: " + error.message);
      } finally {
        setIsPending(false);
      }
    };

    if (user) getBlogs();
  }, [dispatch, user]);

  return { blogs, error, isPending };
};

export const useGetSpace = (id) => {
  const spaceId = id || "646c1929ebba035de6f2208c";
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [space, setSpace] = useState({});

  useEffect(() => {
    const getSpace = async () => {
      setIsPending(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/getSpace/${spaceId}`,
          {
            mode: "cors",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setSpace(data);
          console.log("Gotten Space", data);
        } else {
          throw Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsPending(false);
    };

    if (user) getSpace();
  }, [spaceId, id, user]);
  return { error, isPending, space };
};

export const useGetUserSpaces = () => {
  const { user } = useAuthContext();
  const [spaces, setSpaces] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        setIsPending(true);
        const response = await fetch("http://localhos:4000/api/getUserSpaces", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        });
        const data = await response.json();
        if (response.ok) {
          setSpaces(data);
          console.log("User Spaces: ", data);
        } else {
          throw Error(data.error);
        }
      } catch (error) {
        setError(error);
      }
      setIsPending(false);
    };

    if (user) getSpaces();
  }, [user]);

  return { spaces, error, isPending };
};

export const useAddMember = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const addMember = async (spaceId, admin, memberId) => {
    try {
      setIsPending(true);
      const response = await fetch(
        `http://localhost:4000/api/space/${spaceId}/addUser/${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
          mode: "cors",
        },
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Added Member: ", data);
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsPending(false);
  };
  return { error, isPending, addMember };
};

export const useJoinSpace = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const joinSpace = async (spaceId) => {
    try {
      setIsPending(true);
      const response = await fetch(
        `http://localhost:4000/api/space/${spaceId}/join`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        },
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Joined Space: ", data);
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsPending(false);
  };

  return { error, isPending, joinSpace };
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useCreateBlog = () => {
  const { user } = useAuthContext();
  const [spaceId, setSpaceId] = useState(null);
  const [spaceTitle, setSpaceTitle] = useState("Default");
  const [spaces, setSpaces] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const url = "http://localhost:4000/api/createBlog";
  const nav = useNavigate();

  useEffect(() => {
    const getSpaces = async () => {
      try {
        setIsPending(true);
        const response = await fetch(
          "http://localhost:4000/api/getUserSpaces",
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            mode: "cors",
          },
        );
        const data = await response.json();
        if (response.ok) {
          setSpaces(data);
          console.log("User Spaces: ", data);
        } else {
          console.log("error getSpaces", data.error);
          throw Error(data.error);
        }
      } catch (error) {
        setError(error);
      }
      setIsPending(false);
    };
    if (user) getSpaces();
  }, [user]);

  useEffect(() => {
    for (let key in spaces) {
      if (spaces[key].title === spaceTitle) {
        setSpaceId(spaces[key]._id);
        return;
      }
    }
  }, [spaceId, spaceTitle, spaces]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    let emptyFields = [];
    if (title.trim() === "") emptyFields.push("title");
    if (body.trim() === "") emptyFields.push("body");
    if (emptyFields.length > 0) {
      setError(`Please fill : ${emptyFields.join(", ")}`);
      setIsPending(false);
      return;
    }

    const postBlog = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
          body: JSON.stringify({ title, body, author: user.username, spaceId }),
        });
        const data = await res.json();

        if (res.ok) {
          setIsPending(false);
          console.log("new blog added");
          spaceId === "646c1929ebba035de6f2208c"
            ? nav("/")
            : nav(`/space/${spaceId}`);
        } else {
          setError(data.error);
          console.log(data.error);
          setIsPending(false);
        }
      } catch (error) {
        setError("Connection Error: " + error.message);
      }
    };

    if (user) postBlog();
  };

  return {
    handleSubmit,
    title,
    setTitle,
    setSpaceTitle,
    spaceTitle,
    spaces,
    body,
    setBody,
    error,
    isPending,
  };
};

export const useGetBlog = (blogId, user) => {
  const { blog, dispatch } = useBlogContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const [owner, setOwner] = useState(false);
  const blogsURL = `http://localhost:4000/api/blogs/${blogId}`;

  useEffect(() => {
    const getBlog = async () => {
      try {
        setIsPending(true);
        const response = await fetch(blogsURL, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "GET-BLOG", payload: data });
          console.log("blog", data);
          if (data.author === user.username) setOwner(true);
        } else {
          throw Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };

    if (user) getBlog();
  }, [blogsURL, dispatch, user]);

  return { isPending, error, owner, blog };
};

export const useGetUserBlogs = (username) => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      setIsPending(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/personalBlogs/${username}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
          console.log("blogs", data);
        } else {
          throw Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsPending(false);
    };

    if (user) getBlogs();
  }, [username, user]);

  return { error, blogs, isPending };
};

export const useDeleteBlog = (blogId, user, spaceId) => {
  const [error, setError] = useState();
  const nav = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/blogs/${blogId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log("the blog is deleted");
        nav(`/space/${spaceId}`);
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, handleDelete };
};

export const usePostLike = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const [likes, setLikes] = useState(null);

  const postLike = async (blogId, user) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/blogs/${blogId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        },
      );

      const data = await response.json();
      if (response.ok) {
        console.log("the blog is liked");
        console.log(data);
        setLikes(data.likes);
      } else {
        throw Error(data.error);
        // throw Error(response.statusText);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { error, postLike, isPending, likes };
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useCreateBlog = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const url = "http://localhost:4000/api/createBlog";
  const nav = useNavigate();

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
          body: JSON.stringify({ title, body, author: user.username }),
        });
        const data = await res.json();

        if (res.ok) {
          setIsPending(false);
          console.log("new blog added");
          nav("/");
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

  return { handleSubmit, title, setTitle, body, setBody, error, isPending };
};

export const useGetAllBlogs = () => {
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
        const response = await fetch("http://localhost:4000/api/blogs", {
          headers: { Authorization: `Bearer ${user.token}` },
          mode: "cors",
        });
        if (!response.ok) {
          setError(response.error);
        }
        const data = await response.json();
        dispatch({ type: "GET-ALL-BLOGS", payload: data });
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
          if (data.author === user.username) setOwner(true);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Connection Error: " + error.message);
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
          setError(data.error);
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

export const useDeleteBlog = (blogId, user) => {
  const [error, setError] = useState();
  const nav = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        },
      );
      const data = response.json();
      if (response.ok) {
        console.log("the blog is deleted");
        nav("/");
      } else {
        setError(data.error);
        console.log(data.error);
      }
    } catch (error) {
      setError("Connection Error: " + error.message);
    }
  };

  return { error, handleDelete };
};

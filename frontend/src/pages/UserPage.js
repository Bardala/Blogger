import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import BlogList from "../components/BlogList";

const PersonalPage = () => {
  const { user } = useAuthContext();
  const [pageOwner, setPageOwner] = useState(null);
  const { username } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);

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
  }, [username, user]);

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

  return (
    <>
      {isPending && <p className="loading">Loading...</p>}
      {error && <div className="error">{error}</div>}
      {pageOwner && (
        <div className="user-profile">
          <h1>{pageOwner.username} Page</h1>
          <div className="user-information">
            <h2>user information</h2>
            <p>username: {pageOwner.username}</p>
            <p>email: {pageOwner.email}</p>
            <p>
              From{" "}
              {formatDistantToNow(new Date(pageOwner.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>

          <div>
            {error && <div className="error">{error}</div>}
            {isPending && <p>Loading...</p>}
            <h2>blogs</h2>
            <div>
              {blogs?.length > 0 ? (
                <BlogList blogs={blogs} />
              ) : (
                !isPending &&
                !error && (
                  <div className="not-found">
                    <p>There isn't blogs</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalPage;

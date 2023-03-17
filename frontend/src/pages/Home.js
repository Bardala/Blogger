import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch, blogs } = useBlogContext();
  const url = "http://localhost:4000/blogs";

  useEffect(() => {
    const getBlogs = async () => {
      if (!user) {
        setError("You must me logged in");
        return;
      }
      setIsPending(true);
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${user.token}` },
          mode: "cors",
        });
        if (!response.ok) {
          setError(response.statusText);
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
  }, [dispatch, url, user]);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p>Loading...</p>}
      {blogs?.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        !isPending &&
        !error && (
          <div className="not-found">
            <p>There isn't blogs</p>
            <Link to="/createBlog">Click here to create a blog</Link>
          </div>
        )
      )}
    </div>
  );
};

export default Home;

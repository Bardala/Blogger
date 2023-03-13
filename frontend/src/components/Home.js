import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { useBlogContext } from "../hooks/useBlogContext";

const Home = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch, blogs } = useBlogContext();
  const url = "http://localhost:4000/blogs";

  useEffect(() => {
    const getBlogs = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch({ type: "GET-ALL-BLOGS", payload: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };
    getBlogs();
  }, [dispatch, url]);

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {blogs && !isPending && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;

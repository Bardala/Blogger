import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [blogs, setBlogs] = useState();
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
        setIsPending(false);
        setBlogs(data);
      } catch (error) {
        // Catch any error from fetch or json parsing
        setIsPending(false);
        setError(error.message);
      }
    };
    getBlogs();
  }, [url]);

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;

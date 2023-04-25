import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useGetAllBlogs } from "../hooks/blogsApis";

const Home = () => {
  const { blogs, error, isPending } = useGetAllBlogs();

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

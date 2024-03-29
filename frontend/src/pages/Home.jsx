import { Link, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useGetSpace } from "../hooks/spaceApis";

const Home = () => {
  const { id } = useParams();
  const { space, error, isPending } = useGetSpace(id);
  const blogs = space.blogs;

  if (isPending) return <p>Loading...</p>;

  if (blogs?.length === 0 && !error && !isPending) {
    return (
      <>
        <div className="not-found">
          <p>There isn't blogs</p>
          <Link to="/createBlog">Click here to create a blog</Link>
        </div>
      </>
    );
  }

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {blogs?.length > 0 && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;

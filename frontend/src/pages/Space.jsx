import { Link, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import SpaceInfo from "../components/SpaceInfo";
import { useGetSpace } from "../hooks/spaceApis";

const Space = () => {
  const { id } = useParams();
  const { space, error, isPending } = useGetSpace(id);
  const blogs = space.blogs;
  const { members, adminId: admins, title: spaceTitle, state } = space;

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
      <SpaceInfo
        members={members}
        admins={admins}
        spaceTitle={spaceTitle}
        state={state}
      />
      {blogs?.length > 0 && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Space;

import { useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useGetUserBlogs } from "../hooks/blogsApis";
import { useGetUser } from "../hooks/userApis";
import UserInfoCard from "../components/UserInfoCard";

const PersonalPage = () => {
  const { username } = useParams();
  const { error, blogs, isPending } = useGetUserBlogs(username);
  const {
    error: getUserError,
    isPending: getUserPending,
    pageOwner,
  } = useGetUser(username);

  if (getUserPending) return <p className="loading">Loading...</p>;
  if (getUserError) return <p className="error">{error}</p>;

  return (
    <>
      {pageOwner && (
        <div className="user-profile">
          <h1>{pageOwner.username} Page</h1>

          <UserInfoCard pageOwner={pageOwner} blogsLength={blogs?.length} />

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

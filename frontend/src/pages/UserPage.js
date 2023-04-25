import { useParams } from "react-router-dom";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import BlogList from "../components/BlogList";
import { useGetAllBlogs } from "../hooks/blogsApis";
import { useGetUser } from "../hooks/userApis";

const PersonalPage = () => {
  const { username } = useParams();
  const { error, blogs, isPending } = useGetAllBlogs(username);
  const {
    error: getUserError,
    isPending: getUserPending,
    pageOwner,
  } = useGetUser(username);

  return (
    <>
      {getUserPending && <p className="loading">Loading...</p>}
      {getUserError && <div className="error">{error}</div>}
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

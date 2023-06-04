import { Link, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useGetUserBlogs } from "../hooks/blogsApis";
import { useGetUser } from "../hooks/userApis";
import UserInfoCard from "../components/UserInfoCard";
import { useAuthContext } from "../hooks/useAuthContext";

const PersonalPage = () => {
  const user = useAuthContext();
  const { username } = useParams();
  const { error, blogs, isPending } = useGetUserBlogs(username);
  const {
    error: getUserError,
    isPending: getUserPending,
    orderedUser: pageOwner,
  } = useGetUser(username);

  if (getUserPending) return <p className="loading">Loading...</p>;
  if (getUserError) return <p className="error">{error}</p>;

  return (
    <>
      {pageOwner && user && (
        <div className="user-profile">
          <h1>{pageOwner.username} Page</h1>

          <UserInfoCard pageOwner={pageOwner} blogsLength={blogs?.length} />

          {/* {user.user.username === pageOwner.username && ( */}
          <div className="user-spaces">
            <h2>Spaces</h2>

            <div className="user-spaces-list">
              {pageOwner.spaces &&
                Object.keys(pageOwner.spaces).map(
                  (key) =>
                    pageOwner.spaces[key].title !== "Default" && (
                      <div className="space" key={pageOwner.spaces[key]._id}>
                        <Link
                          to={`/space/${pageOwner.spaces[key]._id}`}
                          className="space-link"
                        >
                          <p>{pageOwner.spaces[key].title}</p>
                        </Link>
                      </div>
                    ),
                )}
            </div>
          </div>
          {/* )} */}

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
      )}
    </>
  );
};

export default PersonalPage;

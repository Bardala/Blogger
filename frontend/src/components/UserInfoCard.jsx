import "../styles/userInfoCard.css";

import { useAuthContext } from "../hooks/useAuthContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import { useGetUser, usePutFollower, useUnfollowUser } from "../hooks/userApis";
import { Link } from "react-router-dom";

export default function UserInfoCard(props) {
  let { user } = useAuthContext();
  const { pageOwner, blogsLength } = props;
  const { orderedUser } = useGetUser(user.username);
  user = orderedUser;

  const {
    followUser,
    isPending: followUserPending,
    error: followUserError,
  } = usePutFollower(pageOwner.username);

  const {
    unfollowUser,
    isPending: unfollowUserPending,
    error: unfollowUserError,
  } = useUnfollowUser(pageOwner.username);

  return (
    <div className="user-information">
      {followUserError && <p className="error">{followUserError}</p>}
      {unfollowUserError && <p className="error">{unfollowUserError}</p>}

      {user && user.username === pageOwner.username && (
        <div className="user-links">
          <Link to="/createBlog">Create New Blog</Link>
          <Link to="/createSpace">Create New Space</Link>
        </div>
      )}

      <div className="card-header">
        <h2 className="page">{pageOwner.username} card</h2>
        {user && user.username !== pageOwner.username && (
          <>
            {pageOwner.followers.includes(user._id) ? (
              <button
                onClick={() => unfollowUser()}
                disabled={unfollowUserPending}
                className="unfollow"
                style={{ backgroundColor: "red" }}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUser()}
                className="follow"
                disabled={followUserPending}
              >
                Follow
              </button>
            )}
          </>
        )}
      </div>

      <p>Username: {pageOwner.username}</p>
      <p>Email: {pageOwner.email}</p>
      <p>Followers: {pageOwner.followers.length}</p>
      <p>Following: {pageOwner.following.length}</p>
      <p>Spaces: {pageOwner.spaces.length}</p>
      <p>Blogs: {blogsLength}</p>
      <p>Comments: {pageOwner.comments.length}</p>
      <p>
        From{" "}
        {formatDistantToNow(new Date(pageOwner.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
}

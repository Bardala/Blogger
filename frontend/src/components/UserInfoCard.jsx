import { useAuthContext } from "../hooks/useAuthContext";
import formatDistantToNow from "date-fns/formatDistanceToNow";
import { usePutFollower } from "../hooks/userApis";

export default function UserInfoCard(props) {
  const { user } = useAuthContext();
  const { username, pageOwner, blogsLength } = props;

  const {
    followUser,
    isPending: followUserPending,
    error: followUserError,
  } = usePutFollower(username);
  if (followUserError) console.error(followUserError);

  return (
    <div className="user-information">
      <div className="card-header">
        <h2 className="page">{pageOwner.username} card</h2>
        {user && user.username !== username && (
          <button
            onClick={() => followUser()}
            className="follow"
            disabled={followUserPending}
          >
            Follow
          </button>
        )}
      </div>

      <p>username: {pageOwner.username}</p>
      <p>email: {pageOwner.email}</p>
      <p>number of followers: {pageOwner.followers.length}</p>
      <p>number of following: {pageOwner.following.length}</p>
      <p>number of blogs: {blogsLength}</p>
      <p>number of comments: {pageOwner.comments.length}</p>
      <p>
        From{" "}
        {formatDistantToNow(new Date(pageOwner.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
}

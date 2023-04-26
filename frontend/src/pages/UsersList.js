import { Link } from "react-router-dom";
import { useGetAllUsers } from "../hooks/userApis";

const UsersList = () => {
  const { users, isPending, error } = useGetAllUsers();
  if (isPending) return <p className="loading">Loading...</p>;

  return (
    <div className="user-list">
      <h2>List of users</h2>
      {error && <div className="error">error</div>}
      <ul>
        {users &&
          users.map((user) => (
            <li key={user._id}>
              <Link to={`/users/${user.username}`}>{user.username}</Link>
              <div className="counts-container">
                <p className="blogs-count">{user.blogs.length} blogs</p>
                <p className="comments-count">
                  {user.comments.length} comments
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersList;

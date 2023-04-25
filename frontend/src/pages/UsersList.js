import { Link } from "react-router-dom";
import { useGetAllUsers } from "../hooks/userApis";

const UsersList = () => {
  const { users, isPending, error } = useGetAllUsers();

  return (
    <div className="user-list">
      <h2>List of users</h2>
      {error && <div className="error">error</div>}
      <ul>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          users &&
          users.map((u) => (
            <li key={u._id}>
              <Link to={`/users/${u.username}`}>{u.username}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UsersList;

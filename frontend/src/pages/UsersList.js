import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect, useState } from "react";

const UsersList = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsPending(true);
      try {
        const response = await fetch("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsPending(false);
    };

    if (user) getUsers();
  }, [user]);

  return (
    <div>
      {error && <div className="error">error</div>}
      <ul>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          users &&
          users.map((u) => (
            <div key={u._id}>
              <Link to={`/users/${u._id}`}>{u.username}</Link>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default UsersList;

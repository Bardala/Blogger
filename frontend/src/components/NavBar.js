import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/authHooks";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const nav = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    logout();
    nav("/login");
  };

  return (
    <header className="navbar">
      <div className="title-wrapper">
        <>
          <h1>Blogs</h1>
          {user && (
            <Link to={`/users/${user.username}`} className="username">
              {user.username}
            </Link>
          )}
        </>
      </div>

      <nav className="links">
        {user ? (
          <div>
            <Link to="/users">users</Link>
            <Link to="/">Home</Link>
            <Link to="/createBlog">New Blog</Link>
            <button onClick={handleClick}>logout</button>
          </div>
        ) : (
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

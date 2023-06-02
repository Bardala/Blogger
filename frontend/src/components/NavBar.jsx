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

  if (!user) {
    return (
      <header className="navbar">
        <div className="title-wrapper">
          <h1>Nest</h1>
        </div>
        <nav className="links">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    );
  }

  if (user) {
    return (
      <header className="navbar">
        <div className="title-wrapper">
          <h1>Nest</h1>
          {user && (
            <Link to={`/users/${user.username}`} className="username">
              {user.username}
            </Link>
          )}
        </div>

        <nav className="links">
          <Link to="/users">users</Link>
          <Link to="/">Home</Link>
          <Link to="/createBlog">New Blog</Link>
          <button onClick={handleClick}>logout</button>
        </nav>
      </header>
    );
  }
};

export default Navbar;

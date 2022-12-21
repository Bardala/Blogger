import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Blogs</h1>
      <div className="links">
        <a href="Home">Home</a>
        <a href="create">New Blog</a>
      </div>
    </nav>
  );
};

export default Navbar;

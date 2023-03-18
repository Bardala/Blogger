import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const NotFound = () => {
  const { user } = useAuthContext();
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      {user ? (
        <>
          <p>This Page Is Not Exist</p>
          <Link to="/">Click Here To Back To The Home Page</Link>
        </>
      ) : (
        <>
          <p className="error">You must be logged in</p>
          <Link to="/login">Click Here To Login</Link>
        </>
      )}
    </div>
  );
};

export default NotFound;

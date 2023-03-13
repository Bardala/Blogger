import Home from "./components/Home";
import Navbar from "./components/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import CreateBlog from "./components/CreateBlog";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

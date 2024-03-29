import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import NotFound from "./pages/NotFound";
import CreateBlog from "./pages/CreateBlog";
import CreateSpace from "./pages/CreateSpace";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UsersList from "./pages/UsersList";
import PersonalPage from "./pages/UserPage";
import Space from "./pages/Space";

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
          <Route path="/space/:id" element={<Space />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/createSpace" element={<CreateSpace />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:username" element={<PersonalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

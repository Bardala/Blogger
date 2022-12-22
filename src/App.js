import Create from "./Create";
import Home from "./Home";
import Navbar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadBlog from "./ReadBlog";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/create" element={<Create />} />

          <Route path="/blogs/:id" element={<ReadBlog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// git add .
// git commit -m "Second commit"
// git push

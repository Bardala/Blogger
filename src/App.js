import Create from "./Create";
import Home from "./Home";
import Navbar from "./NavBar";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// git add .
// git commit -m "Second commit"
// git push

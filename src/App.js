import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import NotFoundPage from "./pages/notFound";
import CreatePost from "./pages/createPost";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/404" element={<NotFoundPage />} /> // Dedicated route
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

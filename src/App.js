import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // Ensure you import axios
// import { Navbar } from "./components/Navbar";
// import { Signup } from "./components/Signup";
// import { Login } from "./components/Login";
import { Carousel } from "./components/Carousel";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

// import dataJson from "./assets/data.json";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:5005",
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <Content />
                <div className="card">
                  <button
                    onClick={() => setCount((prevCount) => prevCount + 1)}
                  >
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                </div>
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

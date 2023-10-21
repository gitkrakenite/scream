import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

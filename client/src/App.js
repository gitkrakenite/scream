import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Create from "./pages/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpecificIssue from "./pages/SpecificIssue";
import Account from "./pages/Account";
import { useState } from "react";

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
          <Route path="/new-issue" element={<Create />} />
          <Route path="/issue/:id" element={<SpecificIssue />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

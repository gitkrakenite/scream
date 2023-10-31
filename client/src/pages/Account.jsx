import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <p onClick={handleLogout}>LOGOUT</p>
    </div>
  );
};

export default Account;

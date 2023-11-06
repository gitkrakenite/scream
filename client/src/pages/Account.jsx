import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import MyReports from "../components/MyReports";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* {console.log(user)} */}
      {/* wrapper */}
      <div className="px-[10px]  sm:px-[3em] pt-[1em]">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <Link to="/home">
            <AiOutlineArrowLeft />
          </Link>
          <p onClick={handleLogout}>LOGOUT</p>
        </div>
        {/* user details */}
        <div className="mt-[3em] mb-[2em] w-full flex justify-center md:justify-start text-center sm:text-start">
          <div>
            <h2 className="font-bold text-xl text-zinc-600 mb-2">
              Here Are Your User Details
            </h2>
            <p className="text-teal-600">Only You can see this details</p>
            <div className="mt-[2em]">
              <p>Your ID : {user.campusID}</p>
              <p>Your Full Name : {user.fullName} </p>
              <p>You are : {user.role}</p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Issues Stuff */}
        <div className="mt-[3em] mb-[2em]">
          <MyReports />
        </div>
      </div>
    </div>
  );
};

export default Account;

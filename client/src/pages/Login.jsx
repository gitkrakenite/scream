import React, { useEffect, useState } from "react";
import Logo from "../assets/Blogo.png";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [campusID, setcampusID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Please Check Login Details");
      toast.error("Also Check Network");
    }

    if (user || isSuccess) {
      navigate("/home");
      // toast.success("Welcome Back");
    }

    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!campusID) return toast.error("Campus ID needed");
    if (!password) return toast.error("Password needed");

    try {
      setLoading(true);
      const userData = { campusID, password };
      dispatch(login(userData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to sign you in");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] lg:px-[2em] pt-[1em]">
        {/* topbar */}
        <div className="  flex justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="" className="h-16 w-16" />
          </Link>
        </div>
        {/* form */}
        <div className="mt-[1.8em]">
          <form
            className=" w-[98%] sm:w-[75%]  md:w-[60%] lg:w-[50%] m-auto"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="campID" className="font-bold text-zinc-600">
                Enter Your Campus ID
              </label>
              <input
                type="text"
                placeholder="Campus ID"
                id="campID"
                className="bg-transparent border border-teal-600 p-[8px] rounded-lg"
                required
                value={campusID}
                onChange={(e) => setcampusID(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="password" className="font-bold text-zinc-600">
                Enter Your Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                id="password"
                className="bg-transparent border border-teal-600 p-[8px] rounded-lg"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-[20px]">
              {isLoading || loading ? (
                <Spinner message="verifying ..." />
              ) : (
                <button
                  style={{ fontWeight: 600, letterSpacing: "1px" }}
                  onClick={handleLogin}
                  className="bg-teal-800 w-full text-white p-[8px] rounded-lg"
                >
                  Dive in🙂
                </button>
              )}
            </div>
            <div className="flex gap-[5px] items-center hover:text-teal-600">
              <a href="tel:0798556471">Call Support</a>
              <BiSolidPhoneCall className="text-xl" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

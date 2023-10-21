import React from "react";
import Logo from "../assets/Blogo.png";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
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
          <form className=" w-[98%] sm:w-[75%]  md:w-[60%] lg:w-[50%] m-auto">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="campID" className="font-bold text-zinc-600">
                Enter Your Campus ID
              </label>
              <input
                type="text"
                placeholder="Campus ID"
                id="campID"
                className="bg-transparent border border-teal-600 p-[8px] rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="printingPin" className="font-bold text-zinc-600">
                Enter Printing Pin
              </label>
              <input
                type="text"
                placeholder="Your pin"
                id="printingPin"
                className="bg-transparent border border-teal-600 p-[8px] rounded-lg"
              />
            </div>
            <div className="mb-[20px]">
              <button
                style={{ fontWeight: 600, letterSpacing: "1px" }}
                className="bg-teal-800 w-full text-white p-[8px] rounded-lg"
              >
                Dive in🙂
              </button>
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

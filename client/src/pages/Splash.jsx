import { useState } from "react";
import Bg from "../assets/sbg1.png";
import Logo from "../assets/Blogo.png";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="w-full h-[100vh]">
      <img
        src="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1600"
        // src={Bg}
        alt="Background Placeholder"
        className="w-full h-[100vh] object-cover"
      />

      {/* overlay div */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.9)]" />

      {/* top bar */}
      <div className="absolute w-full h-full top-0 text-white">
        <div className=" px-[10px] lg:px-[2em] pt-[1em] flex justify-between items-center">
          <div>
            <img src={Logo} alt="" className="h-16 w-16" />
          </div>
          <div className="z-50">
            <Link to="/login">
              <p
                className="font-bold text-xl hover:text-teal-600"
                style={{ letterSpacing: "1px" }}
              >
                LOGIN
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
        <h2
          className=" text-xl sm:text-3xl  md:text-4xl  lg:text-5xl mb-6"
          style={{ fontWeight: 700 }}
        >
          Report issues in and around campus
        </h2>
        <h4
          className=" text-md sm:text-xl md:text-2xl lg:text-3xl mb-6"
          style={{ fontWeight: 600 }}
        >
          Striving towards a student friendly environment
        </h4>
        <p className="text-teal-400 mb-6">
          Honesty, Transparency and Integrity
        </p>
      </div>
    </div>
  );
};

export default Splash;

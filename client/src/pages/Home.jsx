import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineSave,
} from "react-icons/ai";
import Logo from "../assets/Blogo.png";
import Reports from "../components/Reports";
import { useSelector } from "react-redux";

const Home = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // read from state
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    // Function to count the number of items in localStorage
    const countItemsInCart = () => {
      try {
        // Retrieve the existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Get the number of items in the cart
        const itemCount = cartItems.length;
        // Update the state with the item count
        setCartItemCount(itemCount);
      } catch (error) {
        // Handle any errors that might occur during parsing or reading from localStorage
        console.error("Error reading from localStorage:", error);
      }
    };

    countItemsInCart(); // Call the function when the component mounts
  }, []);

  return (
    <div>
      {/* wrapper */}
      <div className=" w-[100%] sm:w-[90%] m-auto py-[3px] md:py-[1em] ">
        {/* navbar */}
        <div
          className="mb-[20px] my-[5px] p-[15px] bg-zinc-300 sm:rounded-2xl z-20"
          style={{
            // position: "-webkit-sticky",
            position: "sticky",
            top: 0,
          }}
        >
          <div className="flex justify-between items-center gap-[10px] ">
            <Link to="/">
              <div className="flex item-center flex-col">
                <div>
                  <img src={Logo} alt="" className="w-12 h-12" />
                </div>
              </div>
            </Link>
            <div className="flex gap-[24px]  md:gap-[60px] items-center">
              <Link to="/saved">
                <div className="relative">
                  <AiOutlineSave
                    className="text-3xl text-teal-800"
                    title="Saved"
                  />
                  <p
                    className="absolute bottom-[20px] left-[32px] z-[999]"
                    style={{ fontWeight: 700 }}
                  >
                    1
                  </p>
                </div>
              </Link>
              <Link to="/notifications">
                <div className="relative">
                  <AiOutlineBell
                    className="text-3xl text-teal-800"
                    title="Saved"
                  />
                  <p
                    className="absolute bottom-[20px] left-[32px] z-[999]"
                    style={{ fontWeight: 700 }}
                  >
                    3
                  </p>
                </div>
              </Link>

              <div className="">
                <AiOutlineMenu
                  className="text-teal-800 text-4xl cursor-pointer"
                  onClick={() => {
                    setToggleDrawer(true);
                  }}
                />
                {/*  scrollTo({
                      top: 0,
                      behavior: "smooth",
                    }); */}
              </div>
            </div>
          </div>
        </div>

        {/* side drawer and content */}
        {/* sideDrawer */}
        {toggleDrawer && (
          <div className="fixed top-1 left-1 z-[999] bg-zinc-200 text-zinc-800 min-h-[100vh] w-[100%] md:w-[50%] rounded-tr-3xl rounded-br-3xl">
            {/* content */}
            <div className="pl-[30px]">
              <div className="flex justify-between p-[1em] items-center">
                <div>
                  <img src={Logo} alt="" className="w-10 h-10" />
                </div>
                <AiOutlineClose
                  className=" text-3xl sm:text-4xl cursor-pointer p-[5px] rounded-full"
                  style={{ border: "2px solid #44ab71" }}
                  onClick={() => setToggleDrawer(false)}
                />
              </div>
              <div>
                <ul>
                  <li
                    className=" w-[80%] sm:w-[70%] pb-[4px] mb-[10px]"
                    style={{ borderBottom: "2px solid #1c3b29" }}
                  >
                    <Link to="/resolved" onClick={() => setToggleDrawer(false)}>
                      <p
                        className="text-zinc-500 hover:text-teal-800"
                        style={{ fontWeight: 500 }}
                      >
                        Resolved Issues
                      </p>
                    </Link>
                  </li>

                  <li
                    className=" w-[80%] sm:w-[70%] pb-[4px] mb-[10px]"
                    style={{ borderBottom: "2px solid #1c3b29" }}
                  >
                    <Link
                      to="/new-issue"
                      onClick={() => setToggleDrawer(false)}
                    >
                      <p
                        className="text-zinc-500 hover:text-teal-800"
                        style={{ fontWeight: 500 }}
                      >
                        Add New Issue
                      </p>
                    </Link>
                  </li>

                  <li
                    className=" w-[80%] sm:w-[70%] pb-[4px] mb-[10px]"
                    style={{ borderBottom: "2px solid #1c3b29" }}
                  >
                    <Link to="/fununu" onClick={() => setToggleDrawer(false)}>
                      <p
                        className="text-zinc-500 hover:text-teal-800"
                        style={{ fontWeight: 500 }}
                      >
                        Fununu
                      </p>
                    </Link>
                  </li>
                  <li
                    className=" w-[80%] sm:w-[70%] pb-[4px] mb-[10px]"
                    style={{ borderBottom: "2px solid #1c3b29" }}
                  >
                    <Link to="/account" onClick={() => setToggleDrawer(false)}>
                      <p
                        className="text-zinc-500 hover:text-teal-800"
                        style={{ fontWeight: 500 }}
                      >
                        Account
                      </p>
                    </Link>
                  </li>
                </ul>
                <div>
                  <div className="">
                    <h2 className="py-[10px] text-teal-800">
                      How To Contact Us
                    </h2>
                    <div className="flex gap-[40px] mt-[10px]">
                      <div>
                        <a href="tel:0798556471">
                          {" "}
                          <AiOutlinePhone className="text-3xl" />
                        </a>
                      </div>
                      <div>
                        <a href="mailto:daysseller@gmail.com">
                          <AiOutlineMail className="text-3xl" />
                        </a>
                      </div>
                      <div>
                        <a
                          href="https://wa.me/+254798556471?text=Hello%20there!"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <AiOutlineMessage className="text-3xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* social media */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {/* main content */}
        <div className="flex gap-[20px] px-[4px] lg:px-[20px]">
          <div className="flex-1 ">
            <Reports />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Home;

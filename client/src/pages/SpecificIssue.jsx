import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../components/Comment";
import axios from "../axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowUp,
  AiOutlineComment,
} from "react-icons/ai";
import moment from "moment";
import { FaRegSadCry } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const SpecificIssue = () => {
  const { user } = useSelector((state) => state.auth);

  // fetch the issue
  const { id } = useParams();
  const [singleIssue, setSingleIssue] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIssue = async () => {
    try {
      setLoading(true);

      let checkParam = id;
      const response = await axios.get("/report/specific/" + checkParam);
      if (response) {
        setLoading(false);
        setSingleIssue([response.data]);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Issue.");
      toast.error("Network error or doesn't exist");
    }
  };

  const [issueItemCount, setIssueItemCount] = useState(0);

  const handleSave = async (issue) => {
    // Retrieve the existing cart items from localStorage
    const issueItems = JSON.parse(localStorage.getItem("issues")) || [];

    // Check if the product already exists in the cart
    const exisitingIssue = issueItems.find((item) => item._id === issue._id);

    if (exisitingIssue) {
      // Product already exists, return a message
      toast.error("Already Saved");
      return;
    }

    // Merge the product and extraData into a new object
    const issueWithExtraData = { ...issue };

    // Create a new cart with the existing items and the new product
    const updatedCart = [...issueItems, issueWithExtraData];

    // Update the cart items in localStorage
    localStorage.setItem("issues", JSON.stringify(updatedCart));

    // Update the cart item count in the parent component
    setIssueItemCount((prevCount) => prevCount + 1);

    toast.success(`${issue.title} saved`);
    return;
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  // upvote issue
  const handleUpVote = async (issue) => {
    try {
      if (!user) {
        toast.error("Please Login To upvote", { theme: "dark" });
        return;
      }

      let username = user.username;
      let id = issue._id;
      let upvoteData = { username };

      await axios.post("/report/like/" + id, upvoteData);
      window.location.reload();
    } catch (error) {
      toast.error("Failed To Upvote");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar */}
        <div className="w-full ">
          <Link to="/home">
            <div className=" px-2 sm:px-8 py-[1em] flex items-center gap-[10px]">
              <AiOutlineArrowLeft className="text-xl" />
              <p>Back Home</p>
            </div>
          </Link>
        </div>
        {/* product */}

        {loading ? (
          <div className="w-full justify-center flex mt-[8em]">
            <Spinner message="Fetching Product" />
          </div>
        ) : (
          <div>
            <div className=" px-[10px] md:px-[3em] xl:px-[5em]">
              {singleIssue?.map((item) => (
                <>
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-[2em]"
                  >
                    {/* img side */}
                    <div className="flex-[0.5]">
                      <img
                        src={item.mainPhoto}
                        alt=""
                        className=" md:max-h-[500px]"
                      />
                    </div>
                    {/* text side */}
                    <div className="flex-[0.5]">
                      {/* options */}
                      <div className="flex justify-between">
                        <div>
                          <p># {item.category}</p>
                        </div>

                        {user && (
                          <div className="flex items-center gap-[3em]">
                            <div className="flex items-center gap-2">
                              <AiOutlineArrowUp
                                className="text-2xl text-teal-700 cursor-pointer z-10"
                                title="Like This Product"
                                onClick={() => handleUpVote(item)}
                              />
                              <p>{item.likes.length}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <AiOutlineComment className="text-2xl text-teal-700 " />
                              <p>{item.comments.length}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* add or check out */}
                      <div className="flex gap-2 my-[1em]">
                        <span
                          className="bg-orange-700 text-white p-2 rounded-md"
                          onClick={() => handleSave(item)}
                        >
                          Save For Later
                        </span>
                      </div>

                      {/*  */}
                      <div>
                        <div className="my-[1em]">
                          <p className="text-2xl font-bold mb-2">
                            {item.title}
                          </p>
                          <div>
                            <h2 className="mb-[5px] font-bold text-zinc-600">
                              Directed To
                            </h2>
                            <div className="flex gap-[10px] items-center">
                              <BsFillPersonFill />
                              <p>{item.fixer}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-[1em]">
                            <div className="flex gap-[10px] items-center justify-end mb-[10px]">
                              <CiLocationOn />
                              <p>{item.location}</p>
                            </div>
                            <div>
                              {item.resolved == "no" ? (
                                <div className="flex gap-[5px] items-center text-red-600">
                                  <FaRegSadCry />
                                  <p>Not Resolved</p>
                                </div>
                              ) : (
                                <div className="flex gap-[5px] items-center">
                                  <MdVerifiedUser />
                                  <p>Resolved</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="mb-[1em]">{item.description}</p>
                        <p className=" text-sm text-teal-700 text-end">
                          {moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                      {/* comments` */}
                      <div className="mt-[1em]">
                        {/* <Comment item={item} /> */}
                      </div>
                    </div>
                  </div>
                  {/* RECOMMENDED */}
                  <div className="mt-[2em]">{/* <p>RECOMMENDED</p> */}</div>
                </>
              ))}
            </div>
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default SpecificIssue;

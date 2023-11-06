import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../components/Comment";
import axios from "../axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineComment,
} from "react-icons/ai";
import moment from "moment";
import { FaRegSadCry } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { BsFillPersonFill, BsPen, BsTrash } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const SpecificIssue = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

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

      let campusID = user.campusID;
      let id = issue._id;
      let upvoteData = { campusID };

      await axios.post("/report/like/" + id, upvoteData);
      window.location.reload();
    } catch (error) {
      toast.error("Failed To Upvote");
    }
  };

  // update resolved
  const [resolved, setResolved] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!resolved) return toast.error("You must choose");

    try {
      const dataToSend = { resolved };
      const response = await axios.put("/report/edit/" + id, dataToSend);
      if (response) {
        toast.success("Updated successfully");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Action Failed. Check network");
    }
  };

  // Add a state variable to track the currently displayed photo
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  // Define functions to switch between photos
  const switchToMainPhoto = () => {
    setCurrentPhotoIndex(0);
  };

  const switchToSecPhoto = () => {
    setCurrentPhotoIndex(1);
  };

  const handleDelete = async (id) => {
    if (!id) return toast.error("ID invalid. Contact admin");

    let isDelete = window.confirm("Delete This Issue ? ");

    if (isDelete) {
      try {
        let response = await axios.delete("/report/" + id);
        if (response) {
          toast.success("deleted");
          navigate("/home");
        }
      } catch (error) {
        toast.error("Failed. Check Network or Contact admin");
      }
    }
  };

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
            <Spinner message="Fetching Issue" />
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
                    <div className="flex-[0.5] flex w-full justify-center">
                      <div>
                        <div>
                          <img
                            src={
                              currentPhotoIndex === 0
                                ? singleIssue[0].mainPhoto
                                : singleIssue[0].secPhoto
                            }
                            alt=""
                            className=" md:max-h-[500px]"
                          />
                        </div>
                        <div className="flex justify-center mt-2">
                          <button
                            onClick={switchToMainPhoto}
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-teal-800 text-white mr-[10px]`}
                          >
                            <AiOutlineArrowLeft className="text-xl" />
                          </button>
                          <button
                            onClick={switchToSecPhoto}
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-teal-800 text-white `}
                          >
                            <AiOutlineArrowRight className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* text side */}
                    <div className="flex-[0.5]">
                      {/* options */}
                      <div className="flex justify-between mb-[1em]">
                        <div>
                          <p># {item.category}</p>
                        </div>

                        {user && (
                          <div className="flex items-center gap-[3em]">
                            <div className="flex items-center gap-2">
                              <AiOutlineArrowUp
                                className="text-2xl text-teal-700 cursor-pointer z-10"
                                title="Upvote This Product"
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
                      {/* options */}
                      <div className="flex flex-col gap-[12px] mt-[25px]">
                        {user && (
                          <div className="flex justify-between items-center">
                            <button
                              className="bg-orange-700 text-white p-2 rounded-md cursor-pointer"
                              onClick={() => handleSave(item)}
                            >
                              Save For Later
                            </button>
                            {item.creator === user.campusID && (
                              <div className="flex gap-[20px] items-center">
                                <Link to={`/edit-issue/${item._id}`}>
                                  <BsPen className="text-teal-800 text-2xl" />
                                </Link>
                                <BsTrash
                                  className="text-red-500 text-2xl"
                                  onClick={() => handleDelete(item._id)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {/* if you are the logged in user */}

                        {item.creator === user.campusID && (
                          <div>
                            <form onSubmit={handleUpdate}>
                              <div className="flex flex-col gap-[10px]">
                                <label
                                  htmlFor="update"
                                  className="text-xl font-bold text-zinc-600"
                                >
                                  Update Status ?
                                </label>
                                <select
                                  name="update"
                                  id="update"
                                  className="bg-transparent border border-zinc-400 p-2 rounded-lg"
                                  value={resolved}
                                  onChange={(e) => setResolved(e.target.value)}
                                >
                                  <option value="">Choose</option>
                                  <option value="yes">Resolved</option>
                                  <option value="no">Not Resolved</option>
                                </select>
                              </div>
                              <div className="flex justify-center w-full">
                                <button
                                  className="mt-[15px] p-2 rounded-lg bg-teal-800 text-white "
                                  onClick={handleUpdate}
                                >
                                  Update Now
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                        {/*  */}
                      </div>

                      {/*  */}
                      <div>
                        <div className=" mt-[1.3em] mb-[1em]">
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
                          <div className="flex justify-between items-center mt-[1em] gap-[16px] flex-wrap">
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
                        <Comment item={item} />
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

import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdBugReport } from "react-icons/md";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import "../masonry.css";

import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { DummyCategory } from "../DummyData";
import moment from "moment";

const Reports = () => {
  const { user } = useSelector((state) => state.auth);

  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/report/all");
      if (response) {
        setLoading(false);
        setAllReports(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Reports");
    }
  };

  useEffect(() => {
    handleFetchReports();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allReports?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allReports?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const handleClick = (number) => {
    setStart(number);
    setEnd(number + 3);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClick(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      handleClick(currentPage);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  // search  states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // search user func
  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    // console.log(searchText);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allReports?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.searchTerms.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 600) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-teal-800 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* {console.log(allReports)} */}

      {/* search bar & categories */}
      <div className=" w-full mt-[10px]">
        {/* searchbar */}
        <div className="w-full flex justify-center">
          <form className=" w-[98%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-zinc-300 flex gap-[5px] items-center p-[8px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full "
              required
              // maxLength={15}
              // minLength={2}
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        {/* categories */}
        {!searchText && (
          <div className="mt-4">
            <div className="mb-[15px] flex items-center gap-2">
              <p className="">SCROLL TO FILTER</p>
              <p>
                <AiOutlineArrowRight />
              </p>
            </div>

            {/*  */}
            <div className=" overflow-x-scroll hide-scrollbar  ">
              <ul className=" w-[90vw] flex justify-start  overflow-x-scroll space-x-7  pb-3 ">
                <li
                  className="cursor-pointer flex items-center gap-1 hover:text-teal-700"
                  onClick={handleFetchReports}
                >
                  <MdBugReport />
                  all
                </li>

                {DummyCategory?.map((item) => (
                  <li
                    key={item._id}
                    className="cursor-pointer flex items-center gap-1 hover:text-teal-700"
                    onClick={async () => {
                      setLoading(true);
                      let category = item.title;
                      let dataToSend = { category };
                      try {
                        const response = await axios.post(
                          "/report/cat",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);

                          setAllReports(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find " + item.title);
                      }
                    }}
                  >
                    <MdBugReport />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/*  */}
      </div>

      {/* wrapper */}

      <div className="mt-[5px]">
        {/* pagination */}
        {!searchText && allReports.length > 0 && (
          <nav className="flex justify-center">
            <ul className="flex gap-[2em] mt-[5px] px-[5px] py-[10px] items-center ">
              {/* map */}

              <>
                <li>
                  <a href="#" onClick={prevPage} className="text-zinc-800">
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Prev
                    </p>
                  </a>
                </li>
                <li className="flex gap-[10px] ">
                  {numbers.slice(start - 1, end).map((item, index) => (
                    <li
                      key={index}
                      className={`normal-nav ${
                        currentPage === item && "active-nav"
                      }`}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          handleClick(item);
                          changeCurrentPage(item);
                        }}
                      >
                        <p className="">{item}</p>
                      </a>
                    </li>
                  ))}
                </li>

                <li>
                  <a href="#" onClick={nextPage}>
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Next
                    </p>
                  </a>
                </li>
              </>
            </ul>
          </nav>
        )}
        {/* reports */}
        <div>
          {searchText ? (
            <>
              <div className="mb-[15px] text-zinc-400">
                {searchText && <p>Results For : {searchText}</p>}
              </div>

              {searchedResults?.length > 0 ? (
                <div>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                    columnClassName="my-masonry-grid_column"
                  >
                    {searchedResults?.map((item) => (
                      <Link to={`/issue/${item._id}`} key={item._id}>
                        <div key={item._id} className="flex-shrink-0 mb-3 mt-6">
                          <div className="relative rounded-lg group ">
                            <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                              <div
                                className="bg-gradient-to-t
                            from-transparent to-black opacity-75 w-full h-full rounded-md"
                              >
                                {/* top stats */}
                                <div>
                                  <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                    <div>
                                      <p className="text-white">
                                        #{item.category.substring(0, 17)}...
                                      </p>
                                    </div>
                                    <div className="flex gap-[20px]">
                                      <p className="text-white text-md flex items-center gap-[5px]">
                                        <AiOutlineLike className="text-lg" />
                                        <span>{item.likes?.length}</span>
                                      </p>
                                      <p className="text-white text-md flex items-center gap-[5px]">
                                        <AiOutlineComment className="text-lg" />
                                        <span>{item.comments?.length}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/*  */}
                              </div>
                            </div>

                            <img
                              src={item.mainPhoto}
                              alt=""
                              className=" rounded-lg"
                            />

                            <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                              <p className="text-zinc-900 font-bold text-sm">
                                {item.title.substring(0, 14)} ...
                              </p>
                              <p className=" text-sm text-teal-700">
                                {moment(item.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                      </Link>
                    ))}
                  </Masonry>
                </div>
              ) : (
                <div className="w-full h-[65vh] flex justify-between items-center">
                  <p className="text-center w-full justify-center flex">
                    😥No results for :
                    <span className="text-red-600">{searchText}</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div className="mt-[8em]">
                  <Spinner message="Fetching ..." />
                </div>
              ) : (
                <>
                  {records.length < 1 ? (
                    <div className="mt-[4em] text-center">
                      <p>😥Nothing to show</p>
                    </div>
                  ) : (
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid "
                      columnClassName="my-masonry-grid_column"
                    >
                      {records?.map((item) => (
                        <Link to={`/issue/${item._id}`} key={item._id}>
                          <div
                            key={item._id}
                            className="flex-shrink-0 mb-3 mt-6"
                          >
                            <div className="relative rounded-lg group ">
                              <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                                <div
                                  className="bg-gradient-to-t
                                from-transparent to-black opacity-75 w-full h-full rounded-md"
                                >
                                  {/* top stats */}
                                  <div>
                                    <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                      <div>
                                        <p className="text-white">
                                          #{item.category.substring(0, 17)}...
                                        </p>
                                      </div>
                                      <div className="flex gap-[20px]">
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineLike className="text-lg" />
                                          <span>{item.likes?.length}</span>
                                        </p>
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineComment className="text-lg" />
                                          <span>{item.comments?.length}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/*  */}
                                </div>
                              </div>

                              <img
                                src={item.mainPhoto}
                                alt=""
                                className=" rounded-lg"
                              />

                              <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                                <p className="text-zinc-900 font-bold text-sm">
                                  {item.title.substring(0, 14)} ...
                                </p>
                                <p className=" text-sm text-teal-700">
                                  {moment(item.createdAt).fromNow()}
                                </p>
                              </div>
                            </div>
                            {/*  */}
                          </div>
                        </Link>
                      ))}
                    </Masonry>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
};

export default Reports;

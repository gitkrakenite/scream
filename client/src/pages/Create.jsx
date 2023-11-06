import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DummyCategory, DummyRoles } from "../DummyData";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import axios from "../axios";

const Create = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.campusID) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mainPhoto, setMainPhoto] = useState("");
  const [secPhoto, setSecPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [fixer, setFixer] = useState("");
  const [searchTerms, setSearchTerms] = useState("");

  // upload photot to cloudinary
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const postPhoto = async (pic) => {
    setLoadingPhoto(true);
    if (pic === null || undefined) {
      toast.error("Please select photo");
      return;
    }
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadingPhoto(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingPhoto(false);
      setMainPhoto(urlData.url);
      toast.success("Uploaded Photo");
    } catch (error) {
      setLoadingPhoto(false);
      toast.error("Error uploading Photo");
    }
  };

  // upload sec photo to cloudinary
  const [loadingSecPhoto, setLoadingSecPhoto] = useState(false);
  const postSecPhoto = async (pic) => {
    setLoadingSecPhoto(true);
    if (pic === null || undefined) {
      toast.error("Please select photo");
      return;
    }
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadingSecPhoto(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingSecPhoto(false);
      setSecPhoto(urlData.url);
      toast.success("Uploaded Second Photo");
    } catch (error) {
      setLoadingSecPhoto(false);
      toast.error("Error uploading Second Photo");
    }
  };

  const [loading, setLoading] = useState(false);
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("title missing");
    if (!category) return toast.error("category missing");
    if (!description) return toast.error("description missing");
    if (!mainPhoto) return toast.error("photo missing");
    if (!secPhoto) return toast.error("second photo missing");
    if (!location) return toast.error("specificAddress missing");
    if (!searchTerms) return toast.error("searchTerms missing");
    if (!searchTerms) return toast.error("searchTerms missing");

    try {
      setLoading(true);
      let creator = user?.campusID;
      let dataToSend = {
        title,
        description,
        mainPhoto,
        secPhoto,
        creator,
        category,
        fixer,
        location,
        searchTerms,
      };
      const response = await axios.post("/report/create", dataToSend);
      if (response) {
        setLoading(false);
        toast.success("Added " + title);
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error adding issue");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] pt-[10px]">
        {/* topbar */}
        <div>
          <div className="flex gap-4 items-center">
            <Link to="/home">
              <AiOutlineArrowLeft className="text-lg" />
            </Link>
            <div>
              <h2 className="font-bold text-md text-zinc-600">Add New Issue</h2>
            </div>
          </div>
        </div>
        {/* form */}
        <div className="mt-[2em] pb-[1.3em] w-full">
          <form
            className=" w-[98%] sm:w-[80%] md:w-[65%] lg:w-[50%] m-auto"
            onSubmit={handleCreate}
          >
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label htmlFor="title" className="" style={{ fontWeight: 600 }}>
                Enter A Short Title
              </label>
              <input
                type="text"
                placeholder="title here"
                id="title"
                value={title}
                required
                minLength={2}
                maxLength={40}
                onChange={(e) => setTitle(e.target.value)}
                className="p-[8px] bg-transparent border border-zinc-400 rounded-lg"
              />
            </div>
            {/* description */}
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label htmlFor="desc" className="" style={{ fontWeight: 600 }}>
                Briefly Describe the issue
              </label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="3"
                minLength={5}
                maxLength={500}
                required
                placeholder="what you do max(500)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-[8px] bg-transparent border border-zinc-400 rounded-lg"
              ></textarea>
            </div>
            {/* upload image */}
            <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px]  px-[5px] rounded-lg">
              <div className="flex flex-col gap-2 mt-[20px]">
                <label
                  htmlFor="mainPhoto"
                  className="flex items-center gap-[20px] flex-wrap"
                >
                  <p>Please Select First Photo</p>
                  <div className="flex flex-col items-center">
                    {loadingPhoto ? (
                      <Spinner message="uploading ..." />
                    ) : (
                      <img
                        src={
                          mainPhoto
                            ? mainPhoto
                            : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                        }
                        alt=""
                        className="w-[100px] h-[100px] object-cover"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  placeholder="Add Image"
                  accept="image/*"
                  onChange={(e) => postPhoto(e.target.files[0])}
                  required
                  id="mainPhoto"
                  className="hidden"
                />
              </div>
            </div>
            {/* upload second image */}
            <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px]  px-[5px] rounded-lg">
              <div className="flex flex-col gap-2 mt-[20px]">
                <label
                  htmlFor="secPhoto"
                  className="flex items-center gap-[20px] flex-wrap"
                >
                  <p>Please Select Second Photo</p>
                  <div className="flex flex-col items-center">
                    {loadingSecPhoto ? (
                      <Spinner message="uploading ..." />
                    ) : (
                      <img
                        src={
                          secPhoto
                            ? secPhoto
                            : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                        }
                        alt=""
                        className="w-[100px] h-[100px] object-cover"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  placeholder="Add Image"
                  accept="image/*"
                  onChange={(e) => postSecPhoto(e.target.files[0])}
                  required
                  id="secPhoto"
                  className="hidden"
                />
              </div>
            </div>
            {/* category */}
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label
                htmlFor="categeory"
                className=""
                style={{ fontWeight: 600 }}
              >
                What Best Describes The Issue
              </label>

              <select
                name="category"
                id="category"
                className="p-[8px] bg-transparent border border-zinc-400 rounded-lg bg-zinc-800 text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose</option>
                {DummyCategory.map((item) => (
                  <option key={item.id} className="">
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* location */}
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label
                htmlFor="specificAdd"
                className=""
                style={{ fontWeight: 600 }}
              >
                <p>You can Specify Location</p>
                <p className="text-sm text-emerald-600">Not required</p>
              </label>
              <input
                type="text"
                placeholder="popular local name"
                id="specificAdd"
                value={location}
                minLength={2}
                maxLength={50}
                onChange={(e) => setLocation(e.target.value)}
                className="p-[8px] bg-transparent border border-zinc-400 rounded-lg"
              />
            </div>

            {/* fixer */}
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label htmlFor="fixer" className="" style={{ fontWeight: 600 }}>
                <p>Who is supposed to fix this ?</p>
                <p className="text-sm text-emerald-600"></p>
              </label>
              <select
                name="category"
                id="category"
                className="p-[8px] bg-transparent bg-zinc-800 text-white border border-zinc-400 rounded-lg "
                value={fixer}
                onChange={(e) => setFixer(e.target.value)}
              >
                <option value="">Choose</option>
                {DummyRoles.map((item) => (
                  <>
                    <option key={item.id}>{item.title}</option>
                  </>
                ))}
              </select>
            </div>
            {/* searchTerms */}
            <div className="flex flex-col gap-[8px] mb-[12px]">
              <label
                htmlFor="specificAdd"
                className=""
                style={{ fontWeight: 600 }}
              >
                <p>Search terms associated.</p>
                <p className="text-sm text-emerald-600">
                  separate by comma (,)
                </p>
              </label>
              <input
                type="text"
                placeholder="searchTerms separated by comma"
                id="specificAdd"
                value={searchTerms}
                required
                minLength={2}
                maxLength={70}
                onChange={(e) => setSearchTerms(e.target.value)}
                className="p-[8px] bg-transparent border border-zinc-400 rounded-lg"
              />
            </div>
            {loading || loadingPhoto ? (
              <div className="w-full">
                <p className="text-center">Please wait 😊 ... </p>
              </div>
            ) : (
              <button
                className="bg-emerald-800 text-white w-full p-[8px] rounded-md"
                onClick={handleCreate}
              >
                Add New Issue
              </button>
            )}
          </form>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Create;

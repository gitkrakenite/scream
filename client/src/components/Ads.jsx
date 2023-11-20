import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";

const Ads = () => {
  const dummyApps = [
    {
      id: 1,
      title: "jirani",
      photo:
        "https://images.pexels.com/photos/13804621/pexels-photo-13804621.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description: "connecting you to local businesses and services",
      users: 200,
      link: "https://youtube.com",
    },
    {
      id: 2,
      title: "Yummy",
      photo:
        "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description: "order your favorite meals",
      users: 121,
      link: "https://youtube.com",
    },
  ];
  return (
    <div>
      {/* wrapper */}
      <div>
        <h2 className="mb-[10px]">Recommended Apps</h2>
        <div className="flex gap-[10px] overflow-x-scroll w-full prompt pb-2">
          <div className="flex flex-nowrap">
            {dummyApps?.map((item) => (
              <div key={item.id} className="flex-shrink-0 mr-[15px]">
                <div className="relative rounded-lg group ">
                  <div className="overlay absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100">
                    <div
                      className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                    >
                      {/* top stats */}
                      <div>
                        <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                          <div className="flex gap-[20px]">
                            <p className="text-white text-md flex items-center gap-[5px]">
                              <MdOutlinePersonOutline className="text-lg" />
                              <span>{item.users}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="absolute bottom-[20px] left-[20px]  flex gap-[10%] w-full ">
                        <div>
                          <div className="flex gap-[10px] text-zinc-300">
                            {/* <p>{item.location}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <img
                    src={item.photo}
                    alt=""
                    className="h-24 w-24 rounded-md object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-[8px]">
                  <p className="text-sm">{item.title}</p>
                  <a href={item.link} className="text-teal-700">
                    <GoArrowUpRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Ads;

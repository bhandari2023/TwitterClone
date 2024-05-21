import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[25%] ">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none">
        <CiSearch size="20px" />
        <input
          className="bg-transparent outline-none p-2"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-3 ">
        <h1 className="font-bold text-lg my-3">Suggestions</h1>
        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <Avatar
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png"
                  size="50"
                  round={true}
                />
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="p-3 py-1 bg-black text-white rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;

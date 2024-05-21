import React from "react";
import { CiHome, CiSearch, CiUser, CiBookmark, CiLogout } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-4 mt-2"
            width={"25px"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTNznZDXCAOjs3PMD3wIrtLrXB4MWkDeEOQ&usqp=CAU"
            alt="tweetyLogo"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full "
          >
            <div>
              <CiHome size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ">
            <div>
              <CiSearch size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ">
            <div>
              <IoMdNotificationsOutline size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Notification</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full "
          >
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full "
          >
            <div>
              <CiLogout size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className=" ml-4 px-4 py-2 border-none text-md bg-[#1d9BF0] hover:cursor-pointer text-white font-bold w-full rounded-full">
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

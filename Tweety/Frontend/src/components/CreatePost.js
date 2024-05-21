import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOff } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast"; // Ensure react-hot-toast is properly imported
import { useSelector, useDispatch } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      console.log("Response:", res.data); // Check response data
      if (res.data.Success) {
        console.log("Post created successfully"); // Check if this message is logged
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error); // Check error in console
      toast.error(error.response.data.message);
    }
    setDescription("");
  };
  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray ">
          <div
            onClick={forYouHandler}
            className={`${
              isActive ? "border-b-4 border-blue-600" : null
            }cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive ? "border-b-4 border-blue-600" : null
            }cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png"
                size="50"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-xl ml-3"
              type="text"
              placeholder="What is Happening ?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex mx-2">
              <CiImageOff size="24px" />
            </div>
            <button
              onClick={submitHandler}
              className="mt-2 ml-4 px-4 py-1 border-none text-md bg-[#1d9BF0] hover:cursor-pointer text-white font-bold  rounded-full"
            >
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

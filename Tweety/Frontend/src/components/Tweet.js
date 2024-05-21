import React from "react";
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDelete } from "react-icons/md";
const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeOrDislikehandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4 ">
          <Avatar
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png"
            size="40"
            round={true}
          />
          <div className=" ml-2 w-full">
            <div className="flex item-center mt-2">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className=" text-gray-500 text-sm ml-2 mt-1">
                {`@${tweet?.userDetails[0]?.username}. 1m`}
              </p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-2 mr-6">
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikehandler(tweet?._id)}
                  className="p-2 hover:bg-green-200 rounded-full"
                >
                  <CiHeart size="25px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center ">
                <div className="p-2 hover:bg-green-200 rounded-full">
                  <FaRegComment size="20px" />
                </div>

                <p className="ml-1">0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full">
                  <CiBookmark size="20px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-200 rounded-full">
                    <MdOutlineDelete size="20px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

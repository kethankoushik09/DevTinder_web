import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants.jsx";
import { useDispatch } from "react-redux";
import { removerequestsdata } from "../store/requestSlice.js";

const RequestCard = ({ users }) => {
  const dispatch = useDispatch();

  async function sendResponse(status, _id) {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removerequestsdata(_id));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <ul className="w-full md:w-[60%] bg-base-100 rounded-box shadow-md m-auto px-4">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Interested to connect with you..!
      </li>

      {users.map((itm, idx) => (
        <li
          key={idx}
          className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 border-b last:border-none"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              className="size-12 md:size-14 rounded-box object-cover"
              src={itm.fromUserId.photoUrl}
              alt={itm.fromUserId.firstName}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-[150px]">
            <div className="font-medium">{itm.fromUserId.firstName}</div>
            <div className="text-xs font-semibold opacity-60 break-words">
              {itm.fromUserId.about}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 w-full md:w-auto">
            <button
              className="btn btn-accent flex-1 md:flex-none"
              onClick={() => sendResponse("accepted", itm._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-error flex-1 md:flex-none"
              onClick={() => sendResponse("rejected", itm._id)}
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RequestCard;

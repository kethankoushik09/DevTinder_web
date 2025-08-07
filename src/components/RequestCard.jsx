import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removerequestsdata } from "../store/requestSlice";

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
    <ul className=" w-[60%] list bg-base-100 rounded-box shadow-md m-auto">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Intrested to connect with you..!{" "}
      </li>
      {users.map((itm, idx) => (
        <>
          <li className="list-row" key={idx}>
            <div>
              <img
                className="size-10 rounded-box"
                src={itm.fromUserId.photoUrl}
              />
            </div>
            <div>
              <div>{itm.fromUserId.firstName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {itm.fromUserId.about}
              </div>
            </div>
            <button
              className="btn btn-accent"
              onClick={() => sendResponse("accepted", itm._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-error"
              onClick={() => sendResponse("rejected", itm._id)}
            >
              Reject
            </button>
          </li>
        </>
      ))}
    </ul>
  );
};

export default RequestCard;

import React from "react";
import { Link } from "react-router-dom";

const Connectioncard = ({ users }) => {
  return (
    <div className="px-4">
      <ul className="w-full md:w-[60%] bg-base-100 rounded-box shadow-md m-auto">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          People connected with you
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
                src={itm.photoUrl}
                alt={itm.firstName}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-[150px]">
              <div className="font-medium">{itm.firstName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {itm.age}, {itm.gender}
              </div>
              <p className="text-xs mt-1 break-words">{itm.about}</p>
            </div>

            {/* Chat Button */}
            <div className="mt-2 md:mt-0">
              <Link to={`/chat/${itm._id}`}>
                <button className="btn btn-info w-full md:w-auto">Chat</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connectioncard;

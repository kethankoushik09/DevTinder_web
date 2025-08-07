import React from "react";

const Connectioncard = ({users}) => {
  return (
    <div>
      <ul className="w-[60%] list bg-base-100 rounded-box shadow-md m-auto">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          people connected with you
        </li>
        {users.map((itm,idx)=>(
            <li className="list-row" key={idx}>
          <div>
            <img
              className="size-10 rounded-box"
              src={itm.photoUrl}
            />
          </div>
          <div>
            <div>{itm.firstName}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
             {itm.age}, {itm.gender}
            </div>
          </div>
          <p className="list-col-wrap text-xs">
            {itm.about}
          </p>
          <button className="btn btn-info">Chat</button>
        </li>

        ))}
      </ul>
    </div>
  );
};

export default Connectioncard;

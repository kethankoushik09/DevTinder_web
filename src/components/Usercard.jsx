import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removefeed } from "../store/feedSlice";


const Usercard = ({ user }) => {
  const dispatch = useDispatch();
  async function feedUpdate(status) {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${user._id}`,{},{withCredentials:true});
      console.log(res);
      


      dispatch(removefeed(user._id))
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm  py-10">
      <figure>
        <img
          src={user.photoUrl}
          alt="Shoes"
          className="h-70 w-60"

        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName} {user.lastName}</h2>
        <p>{user.age}, {user.gender}</p>

        <p>
          {user.about}
        </p>
        <div className="card-actions justify-around">
          <button className="btn btn-accent" onClick={() => feedUpdate("intrested")}>intrested</button>
          <button className="btn btn-error" onClick={() =>feedUpdate("ignore")}>ignore</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;

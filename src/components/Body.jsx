import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";

const Body = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const FetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      if (location.pathname === "/") {
        navigator("/feed");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("trigger");
        
        navigator("/login");
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      FetchUser();
    }
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;

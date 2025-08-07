import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice.js";
import { addFeed } from "../store/feedSlice.js";
import RequestsPage from "../pages/RequestsPage.jsx";
import { cleardata} from "../store/requestSlice.js";
const Navbar = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  async function handleLogout() {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      disptach(removeUser());
      disptach(cleardata());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleFeed() {
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      disptach(addFeed(feed.data));
      navigate("/feed");
    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  }

  // function 

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/">👨‍💻Dev-Tinder</Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <p className=" px-5">Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  <a onClick={handleFeed}>feed</a>
                </li>
                <li>
                  <Link to="/requests">requests</Link>
                </li>
                <li>
                  <Link to="/connections">connections</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
                
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

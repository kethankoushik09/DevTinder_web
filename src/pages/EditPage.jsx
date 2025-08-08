// import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { addUser } from "../store/userSlice";
// import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.jsx";
// import { useSelector } from "react-redux";
import Usercard from "../components/Usercard.jsx"
import axios from "axios";
import { addUser } from "../store/userSlice.js";

const EditPage = ({ user }) => {
  console.log("profile");

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl|| "");
  const [err, seterr] = useState("");
  const [showToast, setshowToast] = useState(false);

  async function SaveProfile() {
    // const dispatch = useDispatch();
    console.log("update");
    seterr("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      console.log(res.data.dta);

      dispatch(addUser(res.data.data));
      setshowToast(true);
      console.log("toast");

      setInterval(() => {
        setshowToast(false);
      }, 3000);

      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
      seterr(err.response.data);
    }
  }

  return (
    <>
      {showToast && (
        <div className="w-full flex justify-center mt-4">
          <div className="tooltip tooltip-open">
            <button className="btn btn-success">
              Profile saved successsfully!
            </button>
          </div>
        </div>
      )}
      <div className=" flex justify-center gap-x-10">
        <div className="flex justify-center my-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="firstName"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="password"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age : </legend>
                  <input
                    type="Number"
                    className="input"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="gender"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">photoUrl : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Url"
                    value={photoUrl}
                    onChange={(e) => setphotoUrl(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="about"
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
              {err && <button className="btn btn-dash btn-error">{err}</button>}
              <div className="card-actions justify-center mt-6">
                <button className="btn btn-primary" onClick={SaveProfile}>
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-20">
          <Usercard
            user={{ firstName, lastName, age, gender, about, photoUrl}}
          />
        </div>
      </div>
    </>
  );
};

export default EditPage;

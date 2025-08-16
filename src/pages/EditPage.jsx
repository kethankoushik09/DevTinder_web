import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";
import { addUser } from "../store/userSlice.js";
import Usercard from "../components/Usercard.jsx";

const EditPage = ({ user }) => {
  console.log("profile");

  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl || "");
  const [err, seterr] = useState("");
  const [showToast, setshowToast] = useState(false);

  async function SaveProfile() {
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
      console.log(res.data.data);

      dispatch(addUser(res.data.data));
      setshowToast(true);

      setTimeout(() => {
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
              Profile saved successfully!
            </button>
          </div>
        </div>
      )}

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4 md:px-10">
        {/* Form Section */}
        <div className="flex justify-center my-6 md:my-10 w-full md:w-auto">
          <div className="card bg-base-300 w-full md:w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div className="space-y-3">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name : </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name : </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age : </legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender : </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL : </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setphotoUrl(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About : </legend>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="About"
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                    required
                  />
                </fieldset>
              </div>

              {err && (
                <button className="btn btn-dash btn-error w-full mt-4">
                  {err}
                </button>
              )}

              <div className="card-actions justify-center mt-6">
                <button className="btn btn-primary w-full" onClick={SaveProfile}>
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="my-6 md:my-20 flex justify-center w-full md:w-auto">
          <Usercard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditPage;

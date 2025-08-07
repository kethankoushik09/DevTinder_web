import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Errmsg, Seterrmsg] = useState("");
  const [isLoggin, SetisLoggin] = useState(false);
  const [firstName, SetfirstName] = useState("");
  const [lastName, SetlastName] = useState("");
  const handleLoginUser = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        { emailId: email, password },
        { withCredentials: true }
      );
      disptach(addUser(user.data));
      navigate("/profile");
    } catch (err) {
      Seterrmsg(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title m-auto">{isLoggin? "Login":"Signup"}</h2>
          <div>
            {!isLoggin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">firstName</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="firstName"
                    value={firstName}
                    onChange={(e) => SetfirstName(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">lastName</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="lastName"
                    value={lastName}
                    onChange={(e) => SetlastName(e.target.value)}
                    required
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-5" onClick={handleLoginUser}>
              {isLoggin ? "Login" : "Signup"}
            </button>
          </div>
          {Errmsg && <p className="text-rose-600">{Errmsg}</p>}
          <p className="text-center" onClick={() => SetisLoggin((prev) => !prev)}> 
            {isLoggin ? "New User? signUp here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

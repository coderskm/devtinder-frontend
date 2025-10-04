import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../helpers/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASEURL}/login`, { emailId, password }, { withCredentials: true }); //credentials setup in frontend
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data||"Something Went Wrong !");
      console.log(error);
    }
  };

    const handleSignUp = async () => {
      try {
        const res = await axios.post(`${BASEURL}/signup`, {firstName, lastName, emailId, password, age }, { withCredentials: true }); //credentials setup in frontend
        dispatch(addUser(res?.data?.data));
        navigate("/profile");
      } catch (error) {
        setError(error?.response?.data || "Something Went Wrong !");
        console.log(error);
      }
    };

  return (
    <div className="my-10 card card-border bg-amber-100 w-96 m-auto">
      <div className="card-body">
        <h2 className="text-center text-2xl font-medium">{isLoginForm ? "LOGIN" : "SIGN UP"}</h2>
        <div>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Your First Name ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Your Last Name ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Your Age ..."
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Your Email ID ..."
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter Your Password ..."
            />
          </fieldset>
        </div>
        <p className="text-red-400">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>
            {isLoginForm?"Login":"Sign Up"}
          </button>
        </div>
        <p className="text-center cursor-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New User ? Signup Here":"Existing user ? Login Here" }</p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASEURL } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      setToastMessage("");
      const res = await axios.patch(
        `${BASEURL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log("res", res)
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setToastMessage(res?.data?.message);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <div className="my-10 card card-border bg-amber-100 w-96">
          <div className="card-body">
            <h2 className="text-center text-2xl font-medium">EDIT PROFILE</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Your First Name ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Enter Your Last Name ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Profile Photo URL:</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                  placeholder="Enter Your Profile Photo URL ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder="Enter Your Age ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                  placeholder="Enter Your Gender ..."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About:</legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                  placeholder="Write something about yourself..."
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="my-10">
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

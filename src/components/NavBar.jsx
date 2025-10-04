import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../helpers/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASEURL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩‍💻 DevTinder</Link>
      </div>
      {user &&
        <div className="flex gap-2">
          <div className='mt-2'>
            Welcome, {user.firstName}
          </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
            <div className="w-10 rounded-full">
              <img
                alt={user.firstName}
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
}

export default NavBar
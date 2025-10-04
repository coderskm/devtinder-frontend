import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar'
import Footer from './Footer'
import { BASEURL } from '../helpers/constants';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
    const res = await axios.get(`${BASEURL}/profile/view`, { withCredentials: true });
      dispatch(addUser(res.data))
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  }, [])
  
  return (
      <>
          <NavBar />
          <Outlet />          
          <Footer />
      </>
  )
}

export default Body
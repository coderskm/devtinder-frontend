import axios from 'axios';
import { BASEURL } from '../helpers/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const {_id:userId, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      // /request/send/:status/:toUserId
      const res = await axios.post(`${BASEURL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    user && (
      <div className="card bg-black w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt={firstName} />
        </figure>
        <div className="card-body text-white">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", userId)}>
              Ignore
            </button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", userId)}>
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default UserCard
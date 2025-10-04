import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/requests/received`, { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(`${BASEURL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1 className="font-extrabold text-center">No Requests Found</h1>;
  return (
    <div className="text-center my-10 w-1/2 m-auto">
      <h1 className="text-bold text-xl">Requests</h1>
      {requests.map((request) => {
        const {
          _id: requestId,
          fromUserId: { firstName, lastName, photoUrl, age, gender, about },
        } = request;
        return (
          <div className=" flex justify-between items-center gap-3 m-4 p-4 rounded-lg bg-black text-white">
            <div>
              <img src={photoUrl} alt={firstName} className="w-20 h-20 rounded-2xl" />
            </div>
            <div>
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted", requestId)}>
                Accept
              </button>
              <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", requestId)}>
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

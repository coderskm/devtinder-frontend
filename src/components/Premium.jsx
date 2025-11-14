import React from "react";

const Premium = () => {
  return (
    <div className="m-10">
      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid h-50 place-items-center">
          <h1 className="font-extrabold">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection request per day</li>
            <li> - Blue Tick</li>
            <li> - for 3 months</li>
          </ul>
          <button className="btn btn-neutral">Buy Silver</button>
        </div>
        <div className="divider"></div>
        <div className="card bg-base-300 rounded-box grid h-50 place-items-center">
          <h1 className="font-extrabold">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 200 connection request per day</li>
            <li> - Blue Tick</li>
            <li> - for 6 months</li>
          </ul>
          <button className="btn btn-warning">Buy Gold</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

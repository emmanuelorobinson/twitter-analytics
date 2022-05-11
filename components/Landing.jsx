import React, { useState } from "react";
import FindUser from "./FindUser";

//get user id from props and set it to state

const Landing = () => {
  const [userId, setUserId] = useState(null);

  const userIdListner = (userId) => {
    setUserId(userId);
    console.log(userId);
  };

  return (
    <div>
      <FindUser id={userIdListner} />
      {userId && (
        <div/>)}
    </div>
  );
};

export default Landing;

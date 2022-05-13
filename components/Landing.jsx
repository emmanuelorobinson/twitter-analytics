import React, { useState } from "react";
import DisplayMetrics from "./DisplayMetrics";
import FindUser from "./FindUser";

//get user id from props and set it to state

const Landing = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const userIdListner = (userId) => {
    setUserId(userId);
    console.log(userId);
  };

  const usernameListner = (username) => {
    setUsername(username);
    console.log(username);
  }

  return (
    <div>
      <FindUser id={userIdListner} username={usernameListner} />
      {userId && (
        <DisplayMetrics id={userId} username={username}/>)}
    </div>
  );
};

export default Landing;

import React, { useState } from "react";
import DisplayMetrics from "./DisplayMetrics";
import FindUser from "./FindUser";
import styled from "styled-components";

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
    <StyledLanding>
      <FindUser id={userIdListner} username={usernameListner} />
      {userId && (
        <DisplayMetrics id={userId} username={username}/>)}
    </StyledLanding>
  );
};

const StyledLanding = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #DCDCDC;
`;

export default Landing;

import React from "react";
import styled from "styled-components";
import SearchIcon from "./svg/Search";
import Image from "next/image";


const FindUser = (props) => {
  const [user, setUser] = React.useState("");
  const [profileImgUrl, setProfileImgUrl] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const test = await fetch('/api/hello');
      const testData = await test.json();
      console.log(testData);

      console.log("starting fetch");
      const response = await fetch(`/api/getUser?user=${user}`);
      
      const data = await response.json();

      console.log(data);
      props.id(data.id);
      props.username(data.username);
      setProfileImgUrl(data.profile_image_url);

      console.log("fetch complete");

      // const response = await fetch('/api/getCalculations')
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ImagePlaceholder>
        {profileImgUrl && (<Image src={profileImgUrl} width={90} height={90} quality={100} />)}
      </ImagePlaceholder>
      <StyledSearch>
        <div className="input-style">
          <SearchIcon />
          <input
            type="text"
            value={user}
            placeholder="username"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </StyledSearch>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  height: 50vh;
  background-color: #dcdcdc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  /* make circle */
  position: relative;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  margin-bottom: 220px;
  margin-left: 90px;
  background-color: #05536f;
  transform: translate(-50%, -50%);
  justify-content: center;
  border: 2px solid #000000;

  img {
    /* make circle */
    border-radius: 50%;
    background-color: #05536f;

  }
`;

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 23.1vw;
  height: 20.9vh;
  background: #fffbfb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px 33px 48px 48px;

  .input-style {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 15vw;
    height: 5vh;
    border: 1px solid #969696;
    border-radius: 10px;
    padding: 0px 20px;
    align-self: center;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    justify-content: center;
    text-align: center;

    &:hover {
      box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
    }

    &:active {
      box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
    }
    

    svg {
      margin-top: 7px;
      margin-left: -10px;
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      justify-content: center;
      text-align: center;
      background-color: transparent;
      
    }
  }

  button {
    width: 12vw;
    height: 4.5vh;
    left: 627px;
    top: 273px;
    background: #3c4856;
    border-radius: 60px;
    font-family: sans-serif;
    font-style: normal;
    font-size: 1vw;
    line-height: 1vh;
    color: #ffffff;

    &:hover {
      background: #4f5f71;
      color: #ffffff;
      /* translate */
      transform: scale(1.05);
      transition: transform 0.5s ease;
    }
  }
`;

export default FindUser;

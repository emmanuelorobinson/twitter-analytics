import React from "react";
import styled from "styled-components";

const Card = (props) => {



  let value = parseInt(props.value);

  value = value.toLocaleString('en', {useGrouping:true})

  return (
    <StyledCard>
      <StyledHeading>
        <h1>{props.heading}</h1>
      </StyledHeading>
      <StyledValue>{value}</StyledValue>
      <StyledEmoji>{props.emoji}</StyledEmoji>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 17vw;
  height: 14vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
`;

const StyledHeading = styled.div`
  width: 10vw;
  height: 4.5vh;
  margin-top: 20px;
  margin-bottom: 30px;
  background: #1da1f2;
  border-radius: 10px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    text-align: center;

    color: #ffffff;
  }
`;

const StyledValue = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 45px;
  line-height: 77px;
  text-align: center;

  color: #000000;
`;

const StyledEmoji = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 77px;
  text-align: left;
`;

export default Card;

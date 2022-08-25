import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const boolList = () => {
    if (typeof props.value === "object") {
      return true;
    } else {
      return false;
    }
  };

  const checkList = () => {
    //check oif props.value is an object

    console.log(props.value);
    if (typeof props.value === "object") {
      // sort hastags by count from highest to lowest and get top 3
      let sorted = Object.keys(props.value).sort(function (a, b) {
        return props.value[b] - props.value[a];
      });
      let top3 = sorted.slice(0, 3);

      // concatenate top 3 hashtags into string separated by new line
      
      return top3;
    } else {
      let value = parseInt(props.value);

      value = value.toLocaleString("en", { useGrouping: true });

      return value;
    }
  };

  const valueString = checkList();
  const isTrue = boolList();

  return (
    <StyledCard>
      <StyledHeading>
        <h1>{props.heading}</h1>
      </StyledHeading>
      {isTrue ? (
        <StyledValue>{
          
          valueString.map((value) => {
            return <li key={value}>{value}</li>;
          })

          }</StyledValue>
      ) : (
        <StyledValue>{valueString}</StyledValue>
      )}
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
  margin-bottom: 70px;
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

  li {
    font-size: 25px;
    line-height: 30px;
    list-style-type: none;
    margin-bottom: 5px;

  }
`;

const StyledEmoji = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 77px;
  text-align: left;
`;

export default Card;

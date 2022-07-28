import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const DisplayMetrics = (props) => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/getMetrics?username=${props.username}`
      );

      const data = await response.json();
      console.log("data");
      console.log(data);
      setMetrics(data);
    }
    fetchData();

  }, [props.username]);

  return (
    <StyledGrid>
      <Card
        heading="Followers"
        value={metrics.followers_count}
        emoji="🕴🏻"
        />
        <Card
        heading="Following"
        value={metrics.following_count}
        emoji="🐦"
        />
        <Card
        heading="Total Tweets"
        value={metrics.tweet_count}
        emoji="📝"
        />
    </StyledGrid>
  )
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;
  align-items: center;
  justify-content: center;
  margin-left: 19%;
  width: 70%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;


export default DisplayMetrics;

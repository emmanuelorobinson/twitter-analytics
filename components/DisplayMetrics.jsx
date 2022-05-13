import React, { useState, useEffect } from "react";

const DisplayMetrics = (props) => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getMetrics?username=${props.username}`);
      const data = await response.json();
      console.log(data);
    }

    fetchData();
  }, [metrics, props.username]);

  return <div>DisplayMetrics</div>;
};

export default DisplayMetrics;

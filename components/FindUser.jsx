import React from "react";

const FindUser = (props) => {
  const [user, setUser] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/getUser?user=${user}`);

      const data = await response.json();

      console.log(data);
      props.id(data.id);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser(e.target.value);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>Twitter Username</label>
      <input
        type="text"
        value={user}
        placeholder="@abcd"
        onChange={handleChange}
      />
      <button type="submit">Find User</button>
    </form>
  );
};

export default FindUser;

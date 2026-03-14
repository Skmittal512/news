import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogs");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <button onClick={handleClick}
      style={{background: "green", padding: "10px 15px", color: "white", borderRadius:" 10px"}}>
        Go to Courses/Blogs/News
      </button>
    </div>
  );
};

export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // api
  //   .get("/users")
  //   .then((response) => {
  //   }).catch((err) => {
  //     if (err.message === "Failed to refresh token"){
  //       navigate("/login");
  //     }
  //    })

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>OLÁ MUNDO</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;

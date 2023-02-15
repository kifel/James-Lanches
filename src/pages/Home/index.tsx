import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

const Home: React.FC = () => {
  const navigate = useNavigate();
  api
    .get("/users")
    .then((response) => {
      console.log(response.data);
    }).catch((err) => {
      if (err.message === "Failed to refresh token"){
        navigate("/login");
      }
     })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>OLÁ MUNDO</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../service/api";

const ConfirmAccount: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token !== null || token !== undefined) {
      api
        .put(`/auth/confirm-account?code=${token}`)
        .catch((error) => {
          setError(error.response.data.errors[0]);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="row text-center">
          {(() => {
            if (isFetching) {
              return <p>Carregando</p>;
            }
            if (isFetching === false && error !== null) {
              return <p>{error}</p>;
            } else {
              return (
                <>
                  <p>Conta Ativada com sucesso</p>
                  <button className="btn" onClick={() => navigate("/login")}>
                    Go to login
                  </button>
                </>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;

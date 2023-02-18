import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../service/api";
import { Button, Tittle } from "./styles";

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
      <div className="container py-5 h-100">
        <div className="row row d-flex justify-content-center align-items-center h-100 text-center">
          {(() => {
            if (isFetching) {
              return <Tittle>Carregando...</Tittle>;
            }
            if (isFetching === false && error !== null) {
              return <Tittle>{error}</Tittle>;
            } else {
              return (
                <>
                  <Tittle>Conta Ativada com sucesso</Tittle>
                  <Button className="btn" onClick={() => navigate("/login")}>
                    Go to login
                  </Button>
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

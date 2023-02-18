import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import api from "../../service/api";
import {
  Buttons, RecoveryContainer,
  RecoverySection
} from "./styles";

interface Recovery {
  email?: string;
}

const RecoveryPassword: React.FC = () => {
  const [popup, setPopup] = React.useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Recovery>();

  const onSubmit = (data: Recovery) => {
    api
      .post(`/password-recovery/send-email?email=${data.email}`)
      .finally(() => {
        setPopup(true);
      });
  };

  return (
    <>
      <RecoverySection className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 mb-5">
              <RecoveryContainer className="card shadow-2-strong mb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body p-5">
                    <Buttons className="btn" onClick={() => navigate("/login")}>
                      <i
                        className="fa fa-arrow-left me-2"
                        aria-hidden="true"
                      ></i>
                      Voltar
                    </Buttons>
                    <h3 className="mb-5 text-center mt-3">Recovery Password</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Informe seu email"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {errors?.email?.type === "required" && (
                        <p
                          className="mt-1"
                          style={{ color: "red", fontSize: 12 }}
                        >
                          Campo não pode ser nulo
                        </p>
                      )}
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mt-5"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
                </form>
              </RecoveryContainer>
            </div>
          </div>
        </div>
      </RecoverySection>
      <Popup trigger={popup} setTrigger={setPopup}>
        <h3>
          <i className="fa fa-check me-2" style={{ color: "green" }}></i>
          Notification
        </h3>
        <p>If the email exists in the database, password reset link will be send to account email</p>
      </Popup>
    </>
  );
};

export default RecoveryPassword;

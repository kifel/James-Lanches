import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "../../../components/Popup/Popup";
import api from "../../../service/api";
import {
  Buttons,
  ButtonsRows,
  RecoveryContainer,
  RecoverySection
} from "../styles";

interface Recovery {
  password?: string;
  confirm_password?: string;
}

const ConfirmCodePassword: React.FC = () => {
  const { token } = useParams();
  const [popup, setPopup] = React.useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Recovery>();

  const onSubmit = (data: Recovery) => {
    api
      .post(
        `/password-recovery/reset?token=${token}&password=${data.password}`
      )
      .then((response) => {
        navigate("/login");
        toast.success("Reset Password successful !");
      })
      .catch((err) => {
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
                    <h3 className="mb-5 text-center mt-3">Reset Password</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        New Password:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Nova senha"
                        {...register("password", {
                          required: "You must specify a password",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="mt-2" style={{ color: "red" }}>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-1">
                        Confirm Password:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        id="typeEmailX-1"
                        className="form-control form-control-lg"
                        placeholder="Nova senha"
                        {...register("confirm_password", {
                          required: true,
                          validate: (val: any, values: Recovery) => {
                            if (values.password === val) {
                              return true;
                            } else {
                              return "Your passwords do not match";
                            }
                          },
                        })}
                      />
                      {errors.confirm_password && (
                        <p className="mt-2" style={{ color: "red" }}>
                          {errors.confirm_password.message}
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
                    <div className="container">
                      <ButtonsRows className="row">
                        <div className="col-12">
                          <Buttons
                            className="btn"
                            onClick={() => navigate("/register")}
                          >
                            Cadastre-se !
                          </Buttons>
                        </div>
                      </ButtonsRows>
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
          <i className="fa fa-check me-2" style={{ color: "red" }}></i>
          Notification
        </h3>
        <p>Erro, Token invalido</p>
      </Popup>
    </>
  );
};

export default ConfirmCodePassword;

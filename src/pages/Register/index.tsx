import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import api from "../../service/api";
import { Buttons, RegisterContainer, RegisterSection } from "./styles";

interface Register {
  username: string;
  name: string;
  email: string;
  password: string;
  telefone: string;
  confirm_password?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [response, setResponse] = React.useState<string>("");
  const [popup, setPopup] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Register>();

  const onSubmit = (data: Register) => {
    api
      .post("/auth/signup", {
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        telefone: data.telefone,
      })
      .then((request) => {
        setResponse(
          "Register is successful !\n Check your email for activate account"
        );
        setPopup(true);
      })
      .catch((err) => {
        setResponse(err.response.data.errors[0]);
        setPopup(true);
      });
  };

  return (
    <>
      <RegisterSection className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6">
              <RegisterContainer className="card shadow-2-strong mb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body p-5">
                    <Buttons className="btn" onClick={() => navigate("/")}>
                      <i
                        className="fa fa-arrow-left me-2"
                        aria-hidden="true"
                      ></i>
                      Voltar
                    </Buttons>
                    <h3 className="mb-5 text-center">Sign-up</h3>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="typeName">
                            Name:<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            id="typeName"
                            className="form-control form-control-lg"
                            placeholder="Informe seu nome"
                            {...register("name", {
                              required: "You must specify a name",
                            })}
                          />
                          {errors.name && (
                            <p className="mt-2" style={{ color: "red" }}>
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="typeEmailX-2">
                            Username:<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            id="typeEmailX-2"
                            className="form-control form-control-lg"
                            placeholder="Informe seu usuário"
                            {...register("username", {
                              required: "You must specify a username",
                            })}
                          />
                          {errors.username && (
                            <p className="mt-2" style={{ color: "red" }}>
                              {errors.username.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmail">
                        Email:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="typeEmail"
                        className="form-control form-control-lg"
                        placeholder="Informe seu email"
                        {...register("email", {
                          required: "You must specify a email",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-2" style={{ color: "red" }}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="telefone-2">
                        Telefone:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        id="telefone-2"
                        className="form-control form-control-lg"
                        placeholder="Digite sua telefone"
                        {...register("telefone", {
                          required: "You must specify a telefone",
                        })}
                      />
                      {errors.telefone && (
                        <p className="mt-2" style={{ color: "red" }}>
                          {errors.telefone.message}
                        </p>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="typePasswordX-2"
                          >
                            Password:<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            id="typePasswordX-2"
                            className="form-control form-control-lg"
                            placeholder="Digite sua senha"
                            {...register("password", {
                              required: "You must specify a password",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 6 characters",
                              },
                            })}
                          />
                          {errors.password && (
                            <p className="mt-2" style={{ color: "red" }}>
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="typeEmailX-1">
                            Confirm Password:
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            id="typeEmailX-1"
                            className="form-control form-control-lg"
                            placeholder="Nova senha"
                            {...register("confirm_password", {
                              required: true,
                              validate: (val: any, values: Register) => {
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
                      </div>
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
              </RegisterContainer>
            </div>
          </div>
        </div>
      </RegisterSection>
      <Popup trigger={popup} setTrigger={setPopup}>
        <h3>
          <i className="fa fa-exclamation me-2"></i>
          Notification
        </h3>
        <p>{response}</p>
      </Popup>
    </>
  );
};

export default Register;

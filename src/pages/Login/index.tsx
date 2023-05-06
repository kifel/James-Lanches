import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthProvider/useAuth";
import api from "../../service/api";
import {
  Button,
  Buttons,
  ButtonsRows,
  EyeButton,
  LoginContainer,
  LogionSection,
} from "./styles";

interface login {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const [passwordIcon, setPasswordIcon] = useState<string>("bi bi-eye");
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<login>();

  useEffect(() => {
    const iconPasswordView = () => {
      if (passwordView) {
        setPasswordIcon("bi bi-eye-slash");
        setPasswordInputType("");
      } else {
        setPasswordIcon("bi bi-eye");
        setPasswordInputType("password");
      }
    };
    iconPasswordView();
  }, [passwordView]);

  const onSubmit = (data: login) => {
    setLoading(true);
    api
      .post("/auth/signin", {
        username: data.username,
        password: data.password,
      })
      .then((request) => {
        toast.success("Login successful !");
        auth.authenticate(request.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <LogionSection className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 mb-5">
              <LoginContainer className="card shadow-2-strong mb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body p-5">
                    <Buttons className="btn" onClick={() => navigate("/")}>
                      <i className="bi bi-arrow-90deg-left me-2"></i>
                      Voltar
                    </Buttons>
                    <h3 className="mb-5 text-center">Login</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Usuário:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Informe seu usuário"
                        {...register("username", {
                          required: true,
                        })}
                      />
                      {errors?.username?.type === "required" && (
                        <p
                          className="mt-1"
                          style={{ color: "red", fontSize: 12 }}
                        >
                          Campo não pode ser nulo
                        </p>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Senha:<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordInputType}
                          id="typePasswordX-2"
                          className="form-control form-control-lg"
                          placeholder="Digite sua senha"
                          {...register("password", {
                            required: true,
                          })}
                        />
                        <div className="input-group-addon">
                          <EyeButton
                            className="btn"
                            onClick={() => setPasswordView(!passwordView)}
                          >
                            <i className={passwordIcon}></i>
                          </EyeButton>
                        </div>
                      </div>
                      {errors?.password?.type === "required" && (
                        <p
                          className="mt-1"
                          style={{ color: "red", fontSize: 12 }}
                        >
                          Campo não pode ser nulo
                        </p>
                      )}
                    </div>
                    <div className="d-grid">
                      <Button
                        type="submit"
                        className="btn btn-lg btn-danger btn-login text-uppercase fw-bold mt-5"
                        disabled={loading}
                        loading={loading.toString()}
                      >
                        {loading ? "" : "Entrar"}
                      </Button>
                    </div>
                    <div className="container">
                      <ButtonsRows className="row">
                        <div className="col-8">
                          <Buttons
                            className="btn"
                            onClick={() => navigate("/recovery-password")}
                          >
                            Esqueceu a senha ?
                          </Buttons>
                        </div>
                        <div className="col-6">
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
              </LoginContainer>
            </div>
          </div>
        </div>
      </LogionSection>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Login;

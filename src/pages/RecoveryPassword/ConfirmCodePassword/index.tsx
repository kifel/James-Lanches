import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import Popup from "../../../components/Popup/Popup";
import api from "../../../service/api";
import { Button, RecoveryContainer, RecoverySection } from "../styles";

interface Recovery {
  password?: string;
  confirm_password?: string;
}

const ConfirmCodePassword: React.FC = () => {
  const { token } = useParams();
  const [popup, setPopup] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Recovery>();

  const onSubmit = (data: Recovery) => {
    setLoading(true);
    api
      .post(`/password-recovery/reset?token=${token}&password=${data.password}`)
      .then((response) => {
        navigate("/login");
        toast.success("Reset Password successful !");
      })
      .catch((err) => {
        setPopup(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    function handleBeforeUnload(event: any) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <RecoverySection className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 mb-5">
              <RecoveryContainer className="card shadow-2-strong mb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body p-5">
                    <h3 className="mb-5 text-center mt-3">Redefinir senha</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Nova senha:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Nova senha"
                        {...register("password", {
                          required: "Você deve especificar uma senha",
                          minLength: {
                            value: 8,
                            message: "A senha deve ter pelo menos 8 caracteres",
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
                        Confirme a senha:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        id="typeEmailX-1"
                        className="form-control form-control-lg"
                        placeholder="Corfrime a senha"
                        {...register("confirm_password", {
                          required: true,
                          validate: (val: any, values: Recovery) => {
                            if (values.password === val) {
                              return true;
                            } else {
                              return "Suas senhas não coincidem";
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
                      <Button
                        type="submit"
                        className="btn btn-lg btn-danger btn-login text-uppercase fw-bold mt-5"
                        disabled={loading}
                        loading={loading.toString()}
                      >
                        {loading ? "" : "Redefinir"}
                      </Button>
                    </div>
                  </div>
                </form>
              </RecoveryContainer>
            </div>
          </div>
        </div>
        <div className="fixed-bottom">
          <Footer />
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

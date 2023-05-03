import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup/Popup";
import api from "../../service/api";
import { Button, Buttons, RecoveryContainer, RecoverySection } from "./styles";

interface Recovery {
  email?: string;
}

const RecoveryPassword: React.FC = () => {
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
      .post(`/password-recovery/send-email?email=${data.email}`)
      .finally(() => {
        setPopup(true);
        setLoading(false);
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
                      <i className="bi bi-arrow-90deg-left me-2"></i>
                      Voltar
                    </Buttons>
                    <h3 className="mb-5 text-center mt-3">
                      Senha de Recuperação
                    </h3>

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
                    <Button
                        type="submit"
                        className="btn btn-lg btn-danger btn-login text-uppercase fw-bold mt-5"
                        disabled={loading}
                        loading={loading.toString()}
                        >
                           {loading ? "" : "Enviar"}
                      </Button>
                    </div>
                  </div>
                </form>
              </RecoveryContainer>
            </div>
          </div>
        </div>
      </RecoverySection>
      <div className="fixed-bottom">
        <Footer />
      </div>
      <Popup trigger={popup} setTrigger={setPopup}>
        <h3>
          <i className="fa fa-check me-2" style={{ color: "green" }}></i>
          Notificação
        </h3>
        <p>
          Se o e-mail existir no banco de dados, o link de redefinição de senha
          será enviado para conta de e-mail
        </p>
      </Popup>
    </>
  );
};

export default RecoveryPassword;

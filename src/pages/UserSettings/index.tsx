import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Data } from "../../@types/globalTypes";
import Popup from "../../components/Popup/Popup";
import api from "../../service/api";
import {
  Button,
  ButtonCancelEdit,
  ButtonEdit,
  ButtonLoading,
  ButtonOptionsData,
  ButtonWrapper,
  Card,
  Dropzone,
  IconUpload,
  ImageDropzone,
  ImageOverlay,
  ImageWrapper,
  RedBackground,
} from "./styles";

interface UpdateUser {
  username: string;
  name: string;
  email: string;
  password: string;
  telefone: string;
  confirm_password?: string;
  newPassword: string;
  newEmail: string;
}

const UserSettings: React.FC = () => {
  const [popup, setPopup] = React.useState(false);
  const [image, setImage] = useState<FormData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<Data>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState(null);
  const [updateProfile, setUpdateProfile] = useState<Boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [activeMenuOption, setActiveMenuOption] = useState<string>("dados");
  const [editInput, setEditInput] = useState<boolean>(true);

  const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      email: "",
      name: "",
      username: "",
      telefone: "",
      newPassword: "",
      newEmail: "",
    },
  });

  useEffect(() => {
    setValue("email", data?.email ?? "");
    setValue("name", data?.name ?? "");
    setValue("username", data?.username ?? "");
    setValue("telefone", data?.telefone ?? "");
  }, [data, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/users/logged")
        .then((response: any) => {
          setData(response.data);
        })
        .catch((error: any) => {
          if (error.message === "Failed to refresh token") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          setError(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };
    fetchData();
  }, [updateProfile]);

  useEffect(() => {
    return () => {
      setImagePreview("");
    };
  }, [popup]);

  const onSubmit = (data: UpdateUser) => {
    setUpdating(true);
    api
      .put("/users/update", {
        name: data.name,
        username: data.username,
        password: data.password,
        telefone: data.telefone,
      })
      .then((request) => {
        toast.success("Cadastro alterado com sucesso !");
      })
      .catch((err) => {
        if (err.message === "Failed to refresh token") {
          localStorage.removeItem("user");
          navigate("/login");
        }
        toast.error(err.response.data.errors[0]);
      })
      .finally(() => {
        setUpdating(false);
        setUpdateProfile(!updateProfile);
        setEditInput(!editInput);
      });
  };

  const onSubmitPassword = (data: UpdateUser) => {
    setUpdating(true);
    api
      .put("/users/update-password", {
        password: data.newPassword,
      })
      .then((request) => {
        toast.success("Cadastro alterado com sucesso !");
      })
      .catch((err) => {
        if (err.message === "Failed to refresh token") {
          localStorage.removeItem("user");
          navigate("/login");
        }
        toast.error(err.response.data.errors[0]);
      })
      .finally(() => {
        setUpdating(false);
        setUpdateProfile(!updateProfile);
        setEditInput(!editInput);
      });
  };

  const onSubmitEmail = (data: UpdateUser) => {
    setUpdating(true);
    api
      .put("/users/update/email", {
        email: data.newEmail,
      })
      .then((request) => {
        toast.success("Solicitação realizada com sucesso !");
      })
      .catch((err) => {
        if (err.message === "Failed to refresh token") {
          localStorage.removeItem("user");
          navigate("/login");
        }
        toast.error(err.response.data.errors[0]);
      })
      .finally(() => {
        setUpdating(false);
        setUpdateProfile(!updateProfile);
        setEditInput(!editInput);
      });
  };

  function createFileList(file: File): FileList {
    const fileList = new DataTransfer();
    fileList.items.add(file);
    return fileList.files;
  }

  const handleDrop = (file: File) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Apenas imagens são permitidas.");
        handleClearImage();
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };

      const fileList = createFileList(file); // cria um novo FileList com o arquivo que foi arrastado
      const input = inputRef.current;
      if (input) {
        input.files = fileList; // substitui o valor do input pelo novo FileList
      }

      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      setImage(formData);
      setFileSizeError(file.size > MAX_FILE_SIZE);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]; // add a check for null or undefined

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Apenas imagens são permitidas.");
        handleClearImage();
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string); // add a check for null or undefined
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      setImage(formData);
      setFileSizeError(file.size > MAX_FILE_SIZE);
    }
  };

  const handleSubmitImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (image && !fileSizeError) {
      setLoading(true);
      api
        .put("/users/update/image", image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((request) => {
          toast.success("Imagem alterada com sucesso !");
        })
        .catch((error: any) => {
          if (error.message === "Failed to refresh token") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          setError(error);
        })
        .finally(() => {
          setLoading(false);
          setPopup(!popup);
          setUpdateProfile(!updateProfile);
        });
    }

    if (fileSizeError) {
      toast.error("Tamanho Máximo de arquivo: 4.5MB");
    }
  };

  const handleClearImage = () => {
    setImagePreview("");
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const closeEditMenu = () => {
    setEditInput(!editInput);
    setUpdateProfile(!updateProfile);
  };

  const dataMenuContent = () => {
    return (
      <div className="col-12 col-sm-7 mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Account Settings</h3>
          {editInput ? (
            <ButtonEdit
              onClick={() => setEditInput(!editInput)}
              className="btn"
              style={{ fontSize: 20 }}
            >
              <i
                className="bi bi-pencil-square me-2"
                style={{ color: "red" }}
              ></i>
              Editar
            </ButtonEdit>
          ) : (
            ""
          )}
        </div>
        <div className="form-outline mb-4 mt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label" htmlFor="typeName">
              Nome:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="typeName"
              disabled={editInput}
              className="form-control form-control-lg"
              placeholder="Informe seu nome"
              {...register("name", {
                required: "Você deve especificar um nome",
              })}
            />
            {errors.name && (
              <p className="mt-2" style={{ color: "red" }}>
                {errors.name.message}
              </p>
            )}
            <div className="form-outline mb-4 mt-2">
              <label className="form-label" htmlFor="typeName">
                username:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="typeUserName"
                className="form-control form-control-lg"
                placeholder="Informe seu nome"
                disabled={editInput}
                {...register("username", {
                  required: "Você deve especificar um username",
                })}
              />
              {errors.username && (
                <p className="mt-2" style={{ color: "red" }}>
                  {errors.username.message}
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
                disabled={editInput}
                className="form-control form-control-lg"
                placeholder="Digite sua telefone"
                {...register("telefone", {
                  required: "Você deve especificar um telefone",
                })}
              />
              {errors.telefone && (
                <p className="mt-2" style={{ color: "red" }}>
                  {errors.telefone.message}
                </p>
              )}
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typeEmail">
                Email:
              </label>
              <input
                id="typeEmail"
                className="form-control form-control-lg"
                placeholder="Informe seu email"
                disabled
                {...register("email", {
                  required: "Você deve especificar um email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de email invalido",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2" style={{ color: "red" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            {editInput ? (
              <></>
            ) : (
              <div className="row">
                <div className="col-6">
                  <ButtonLoading
                    type="submit"
                    className="btn btn-danger text-uppercase fw-bold mt-5"
                    disabled={updating}
                    loading={updating.toString()}
                  >
                    {updating ? "" : "Atualizar"}
                  </ButtonLoading>
                </div>
                <div className="col-6">
                  <ButtonCancelEdit
                    className="btn btn-danger text-uppercase fw-bold mt-5"
                    onClick={closeEditMenu}
                  >
                    Cancelar
                  </ButtonCancelEdit>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  const emailMenuContent = () => {
    return (
      <div className="col-12 col-sm-7 mt-5">
        <h3>Account Settings</h3>
        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <div className="row">
            <div className="col-12">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email-2">
                  Email:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email-2"
                  className="form-control form-control-lg"
                  placeholder="Digite o novo email"
                  {...register("newEmail", {
                    required: "Você deve especificar um email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Endereço de email invalido",
                    },
                  })}
                />
                {errors.newEmail && (
                  <p className="mt-2" style={{ color: "red" }}>
                    {errors.newEmail.message}
                  </p>
                )}
              </div>
            </div>
            <ButtonLoading
              type="submit"
              className="btn btn-danger text-uppercase fw-bold mt-5"
              disabled={updating}
              loading={updating.toString()}
            >
              {updating ? "" : "Atualizar"}
            </ButtonLoading>
          </div>
        </form>
      </div>
    );
  };

  const senhasMenuContent = () => {
    return (
      <div className="col-12 col-sm-7 mt-5">
        <h3>Account Settings</h3>
        <form onSubmit={handleSubmit(onSubmitPassword)}>
          <div className="row">
            <div className="col-6">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="typePasswordX-2">
                  Senha:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="typePasswordX-2"
                  className="form-control form-control-lg"
                  placeholder="Digite sua senha"
                  {...register("newPassword", {
                    required: "Você deve especificar uma senha",
                    minLength: {
                      value: 8,
                      message: "A senha deve conter pelo menos 8 caracteres",
                    },
                  })}
                />
                {errors.newPassword && (
                  <p className="mt-2" style={{ color: "red" }}>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="typeEmailX-1">
                  Confirme a senha:
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="typeEmailX-1"
                  className="form-control form-control-lg"
                  placeholder="Nova senha"
                  {...register("confirm_password", {
                    required: "Você deve especificar uma senha",
                    validate: (val: any, values: UpdateUser) => {
                      if (values.newPassword === val) {
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
            </div>
            <ButtonLoading
              type="submit"
              className="btn btn-danger text-uppercase fw-bold mt-5"
              disabled={updating}
              loading={updating.toString()}
            >
              {updating ? "" : "Atualizar"}
            </ButtonLoading>
          </div>
        </form>
      </div>
    );
  };

  const apconectMenuContent = () => {
    return (
      <div className="col-12 col-sm-7 mt-5">
        <h3>Account Settings</h3>
        <p>Aparelhos conectados</p>
        <h1>Em construção</h1>
      </div>
    );
  };

  return (
    <>
      <RedBackground className="container-fluid" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card className="card">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-4 mt-5">
                    <ImageWrapper>
                      {isFetching ? (
                        <div
                          className="spinner-border"
                          role="status"
                          style={{ width: 120, height: 120 }}
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <img
                          src={data?.imageUrl}
                          alt="User picture"
                          className="rounded-circle"
                          style={{ width: 120, height: 120 }}
                        />
                      )}
                      <ImageOverlay>
                        <ButtonWrapper>
                          <Button onClick={() => setPopup(!popup)}>
                            <i
                              className="bi bi-camera me-2"
                              style={{ fontSize: 24 }}
                            ></i>
                            Mudar imagem
                          </Button>
                        </ButtonWrapper>
                      </ImageOverlay>
                    </ImageWrapper>
                    <div className="ms-5">
                      <h3 className="ms-5 mt-3">{data?.name}</h3>
                      <p className="ms-5 card-text">{data?.username}</p>
                    </div>
                    <div className="container mt-5">
                      <div className="row mt-5 d-flex justify-content-center">
                        <ButtonOptionsData
                          isactive={activeMenuOption === "dados"}
                          className="btn col-12 mt-2"
                          onClick={() => setActiveMenuOption("dados")}
                        >
                          Dados
                        </ButtonOptionsData>
                        <ButtonOptionsData
                          isactive={activeMenuOption === "email"}
                          className="btn col-12 mt-2"
                          onClick={() => setActiveMenuOption("email")}
                        >
                          Email
                        </ButtonOptionsData>
                        <ButtonOptionsData
                          isactive={activeMenuOption === "senhas"}
                          className="btn col-12 mt-2"
                          onClick={() => setActiveMenuOption("senhas")}
                        >
                          Senhas
                        </ButtonOptionsData>
                        <ButtonOptionsData
                          isactive={activeMenuOption === "apconect"}
                          className="btn col-12 mt-2"
                          onClick={() => setActiveMenuOption("apconect")}
                        >
                          Aparelhos Conectados
                        </ButtonOptionsData>
                      </div>
                    </div>
                  </div>
                  {activeMenuOption === "dados" && dataMenuContent()}
                  {activeMenuOption === "email" && emailMenuContent()}
                  {activeMenuOption === "senhas" && senhasMenuContent()}
                  {activeMenuOption === "apconect" && apconectMenuContent()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Popup trigger={popup} setTrigger={setPopup}>
        <h3>
          <i className="fa fa-exclamation me-2"></i>
          Alterar Avatar
        </h3>
        <form onSubmit={handleSubmitImage}>
          <div className="row">
            <div className="col-12">
              <Dropzone
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(e.dataTransfer.files[0]);
                }}
                ref={inputRef}
              >
                {imagePreview ? (
                  <ImageDropzone src={imagePreview} alt="Preview" />
                ) : (
                  <p style={{ fontSize: 20 }}>
                    <IconUpload className="bi bi-cloud-arrow-up-fill me-3"></IconUpload>
                    Arraste e solte a imagem aqui
                  </p>
                )}
              </Dropzone>
              <div className="d-flex justify-content-center align-items-center">
                <input
                  className="form-control mt-3 ms-3"
                  type="file"
                  accept="image/*"
                  max-size="5MB"
                  onChange={handleImageUpload}
                  ref={inputRef}
                />
                {imagePreview && (
                  <>
                    <button
                      className="btn btn-danger ms-3 mt-3"
                      onClick={handleClearImage}
                      style={{ width: "50%", height: "40px" }}
                    >
                      Remover
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <ButtonLoading
              type="submit"
              className="btn btn-danger"
              disabled={loading}
              loading={loading.toString()}
            >
              {loading ? "" : "Enviar"}
            </ButtonLoading>
          </div>
        </form>
      </Popup>
    </>
  );
};

export default UserSettings;

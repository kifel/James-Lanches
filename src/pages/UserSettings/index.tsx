import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Data } from "../../@types/globalTypes";
import Popup from "../../components/Popup/Popup";
import api from "../../service/api";
import {
  Button,
  ButtonLoading,
  ButtonWrapper,
  Card,
  ImageOverlay,
  ImageWrapper,
} from "./styles";

const UserSettings: React.FC = () => {
  const [popup, setPopup] = React.useState(false);
  const [image, setImage] = useState<FormData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [data, setData] = useState<Data>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState(null);
  const [updateProfile, setUpdateProfile] = useState<Boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
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
  }, [updateProfile]);

  useEffect(() => {
    setImagePreview("");
  }, [popup]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]; // add a check for null or undefined

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string); // add a check for null or undefined
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      setImage(formData);
    }
  };

  const handleSubmitImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (image) {
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
  };

  const handleClearImage = () => {
    setImagePreview("");
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="container-fluid bg-danger">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-5 mb-5">
              <h1 style={{ color: "white" }}>Account Settings</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card className="card" style={{ height: "35rem" }}>
              <div className="container">
                <div className="row">
                  <div className="col-4 mt-5">
                    <ImageWrapper>
                      <img
                        src={data?.imageUrl}
                        alt="User picture"
                        className="rounded-circle"
                        style={{ width: 120, height: 120 }}
                      />
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
                      <h3 className="card-title mt-3">{data?.name}</h3>
                      <p className="card-text">{data?.username}</p>
                    </ImageWrapper>
                  </div>
                  <div className="col-7 mt-5">
                    <h3>Account Settings</h3>
                  </div>
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
              <input
                className="form-control mt-3"
                type="file"
                onChange={handleImageUpload}
                ref={inputRef}
              />
              {imagePreview && (
                <>
                  <p className="mt-5 text-center">PREVIEW</p>
                  <img
                    className="ms-5 rounded-circle"
                    style={{ width: 120, height: 120 }}
                    src={imagePreview}
                    alt="Preview"
                  />
                  <button className="btn btn-danger ms-5" onClick={handleClearImage}>Remover imagem</button>
                </>
              )}
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
          </div>
        </form>
      </Popup>
    </>
  );
};

export default UserSettings;

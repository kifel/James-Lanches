import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../@types/globalTypes";
import api from "../../../service/api";

const ProductsDetails: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [data, setData] = useState<Product | null>();
  const [erro, setErro] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setErro(err.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  if (isFetching) {
    // Show loading placeholder using Bootstrap spinner
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (erro) {
    // Show error page using Bootstrap alert
    return (
      <div
        className="alert alert-danger d-flex justify-content-center align-items-center vh-100"
        role="alert"
      >
        <h2>Error</h2>
        <p>{erro}</p>
      </div>
    );
  }

  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <img
            src={data?.imageUrl}
            alt={data?.name}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-12 col-md-6">
          <p>Rating: {data?.rating}</p>
          <h1>{data?.name}</h1>
          <p>{data?.description}</p>
          <strong>Price: {data?.price}</strong>
          <button className="btn mt-5 text-center btn-danger">Comprar</button>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;

import React, { useState } from "react";
import { Product } from "../../@types/globalTypes";
import { Card, ImageCard, LoadingSpinner } from "./styles";

interface CardProps {
  data: Product[] | undefined;
}

const ProductCard: React.FC<CardProps> = ({ data }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <div className="Container">
      <div className="row">
        {data?.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch"
            key={product.id}
          >
            <Card
              className="card mt-5 w-100 d-flex flex-column justify-content-between"
              style={{ height: "26rem" }}
              to={`/products/show/${product.id}`}
            >
              {imageLoading ? (
                <div className="d-flex justify-content-center mt-5">
                  <LoadingSpinner className="card-img-top mt-5" />
                </div>
              ) : (
                ""
              )}
              <ImageCard
                src={product.imageUrl}
                className={`card-img-top ${imageLoading ? "d-none" : ""}`}
                alt={product.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              <div className="card-body d-flex flex-column">
                <p
                  className="card-text text-center font-weight-bold"
                  style={{ fontSize: 20 }}
                >
                  {product.name}
                </p>
                {product.description.length > 100 ? (
                  <p className="card-text">
                    {product.description.substring(0, 100)}...
                  </p>
                ) : (
                  <p className="card-text">{product.description}</p>
                )}
                <div className="d-flex mt-auto justify-content-center">
                  <p
                    className="card-text mb-3 btn btn-outline-success"
                    style={{ fontSize: 16 }}
                  >
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;

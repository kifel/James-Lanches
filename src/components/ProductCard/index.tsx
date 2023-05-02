import React from "react";
import { Product } from "../../@types/globalTypes";
import { Card, ImageCard } from "./styles";

interface CardProps {
  data: Product[] | undefined;
}

const ProductCard: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="Container">
      <div className="row">
        {data?.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            key={product.id}
          >
            <Card
              className="card mt-5"
              style={{ height: "26rem" }}
              to={`/products/show/${product.id}`}
            >
              <ImageCard
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
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
                  <p className="card-text mb-3 btn btn-outline-success" style={{fontSize: 16}}>
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

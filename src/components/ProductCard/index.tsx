import React from "react";
import { Product } from "../../@types/globalTypes";

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
            <div className="card mt-5" style={{height: "24rem"}}>
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <p className="card-text">{product.name}</p>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;

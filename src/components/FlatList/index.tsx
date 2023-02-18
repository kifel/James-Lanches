import React from "react";
import { Product } from "../../@types/globalTypes";
import { Card, LinkStyles, Price } from "./styles";

interface FlatListProps {
  data: Product[];
}

const FlatList: React.FC<FlatListProps> = ({ data }) => {
  return (
    <div className="row row-cols-1 g-4 d-flex justify-content-center align-items-center h-100">
      {data.map((product) => (
        <LinkStyles to={`/products/${product.id}`} key={product.id}>
          <div className="col" key={product.id}>
            <Card className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.imageUrl}
                    className="img-fluid rounded-start"
                    alt={product.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <Price>R$ {product.price.toFixed(2)}</Price>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </LinkStyles>
      ))}
    </div>
  );
};

export default FlatList;

import React from "react";
import { Card } from "./styles";


export const SkeletonProductCard: React.FC = () => {
  return (
    <div className="Container">
      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            key={index}
          >
            <Card className="card mt-5" style={{ height: "26rem" }}>
              <div className="skeleton-image" />
              <div className="card-body d-flex flex-column">
                <div
                  className="skeleton-text"
                  style={{ width: "80%", height: "24px" }}
                />
                <div
                  className="skeleton-text"
                  style={{ width: "100%", height: "100px" }}
                />
                <div className="d-flex mt-auto justify-content-center">
                  <div
                    className="skeleton-text"
                    style={{ width: "100px", height: "24px" }}
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

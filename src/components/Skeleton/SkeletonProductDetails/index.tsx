import React from "react";
import { SkeletonLoader, StyledImagePlaceholder } from "./styles";

export const SkeletonProductDetails: React.FC = () => {
  return (
    <>
      <section className="container py-5 mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-4">
            <StyledImagePlaceholder>
              <SkeletonLoader className="img-fluid rounded" />
            </StyledImagePlaceholder>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              <SkeletonLoader style={{ width: "80px", height: "24px" }} />
            </div>
            <SkeletonLoader style={{ width: "200px", height: "32px" }} />
            <SkeletonLoader
              style={{ width: "400px", height: "12px", marginTop: "8px" }}
            />
            <SkeletonLoader
              style={{ width: "120px", height: "24px", marginTop: "16px" }}
            />
            <div className="mt-4">
              <SkeletonLoader style={{ width: "150px", height: "16px" }} />
              <SkeletonLoader
                style={{ width: "180px", height: "16px", marginTop: "8px" }}
              />
            </div>
            <SkeletonLoader
              style={{ width: "100px", height: "40px", marginTop: "16px" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

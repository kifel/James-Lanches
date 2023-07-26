import React from "react";
import {
  SkeletonButton,
  SkeletonCircle,
  SkeletonContainer,
  SkeletonContent,
  SkeletonLine,
} from "./styles";

export const SkeletonUserSettings: React.FC = () => {
  return (
    <SkeletonContainer>
      <div className="container-fluid" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SkeletonContent className="card mt-5">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-12 col-sm-4 mt-5">
                    <SkeletonCircle className="ms-5" />
                    <div className="ms-5">
                      <SkeletonLine width="150px" />
                      <SkeletonLine width="100px" />
                    </div>
                    <div className="container mt-5">
                      <div className="row mt-2 d-flex justify-content-center">
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-7 mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <SkeletonLine width="100px" />
                      <SkeletonLine width="100px" />
                    </div>
                    <div className="form-outline mb-4 mt-2">
                      <SkeletonLine width="200px" />
                    </div>
                    <div className="container mt-5">
                      <div className="row mt-2 d-flex justify-content-center">
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                        <SkeletonButton width="150px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SkeletonContent>
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};

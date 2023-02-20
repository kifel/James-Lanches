import React from "react";
import { Container, Links } from "./styles";

const Footer: React.FC = () => {
  return (
    <Container className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-5">
      <div className="col-md-4 d-flex align-items-center">
        <Links
          href="/"
          className="mb-3 me-2 mb-md-0 text-decoration-none lh-1"
        >
          <i
            className="bi bi-amd ms-5 me-2"
            style={{ fontSize: "20px" }}
          ></i>
        </Links>
        <span className="mb-3 mb-md-0">© 2023 Kifel, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <Links href="#">
            <i className="bi bi-github" style={{ fontSize: "20px" }}></i>
          </Links>
        </li>
        <li className="ms-3">
          <Links href="#">
            <i className="bi bi-instagram" style={{ fontSize: "20px" }}></i>
          </Links>
        </li>
        <li className="ms-3">
          <Links href="#">
            <i className="bi bi-linkedin me-5" style={{ fontSize: "20px" }}></i>
          </Links>
        </li>
      </ul>
    </Container>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Product } from "../../@types/globalTypes";
import aboutImage from "../../assets/aboutImage.jpg";
import image2 from "../../assets/mainpage2.jpg";
import image3 from "../../assets/mainpage3.jpg";
import image from "../../assets/mainpageimage.jpg";
import FlatList from "../../components/FlatList";
import api from "../../service/api";
import {
  AboutUsCol,
  AboutUsText,
  AboutUsTitle,
  Banner,
  ButtonProducts,
  CartText,
  Container,
  SectionTittle,
  Tittle,
  TittleSpan
} from "./styles";

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [sectionTittleRef, sectionTittleInView] = useInView({
    threshold: 0.3, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: false, // define se a detecção deve ser disparada apenas uma vez
  });
  const [aboutUsRef, aboutUsInView] = useInView({
    threshold: 0.9, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: false, // define se a detecção deve ser disparada apenas uma vez
  });

  useEffect(() => {
    api.get("/products/search?isActive=true&page=0&size=3").then((response) => {
      setData(response.data.content);
    });
  }, []);

  return (
    <>
      <Container
        id="carouselExampleDark"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="9000">
            <Banner
              src={image}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-block d-md-block">
              <Tittle>
                James Lanches -{" "}
                <TittleSpan>O sabor que você merece!</TittleSpan>
              </Tittle>
              <CartText>
                O James Lanches oferece hambúrgueres, acompanhamentos e
                sobremesas deliciosas. Os ingredientes são frescos e de
                qualidade, preparados com perfeição.
              </CartText>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <Banner
              src={image2}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-block d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <Banner
              src={image3}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-block d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </Container>
      <div className="container-fluid mt-5">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          ref={sectionTittleRef}
        >
          <SectionTittle inView={sectionTittleInView} className="text-center">
            MAIS VENDIDOS
          </SectionTittle>
          <FlatList data={data} />
        </div>
        <div className="container text-center">
          <ButtonProducts className="btn mt-5 text-center" to="/products">
            Todos os produtos
          </ButtonProducts>
        </div>
        <div className="container mt-5 text-center">
          <div className="row">
            <div className="col-12 mt-5">
              <AboutUsTitle className="mt-5" inView={aboutUsInView}>
                Sobre Nós
              </AboutUsTitle>
            </div>
            <div className="row d-flex justify-content-center align-items-center" ref={aboutUsRef}>
              <AboutUsCol className="col-12 col-md-5 text-center mt-5">
                <AboutUsText>
                  James-Lanches é uma lanchonete que oferece uma ampla variedade
                  de lanches saborosos e bem-feitos com ingredientes frescos e
                  selecionados. Nossa prioridade é garantir a qualidade dos
                  nossos alimentos a preços acessíveis, sem comprometer o
                  atendimento excepcional aos nossos clientes. Além disso,
                  oferecemos uma variedade de opções para atender a todos os
                  gostos e preferências alimentares. Venha experimentar nossos
                  lanches e desfrutar de nossa atmosfera aconchegante com amigos
                  e familiares.
                </AboutUsText>
              </AboutUsCol>
              <div className="col-12 col-md-6 text-center">
                <img src={aboutImage} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top mt-5">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1 mt-3"
          >
            <i
              className="bi bi-amd ms-5 me-2 mt-2"
              style={{ fontSize: "20px" }}
            ></i>
          </a>
          <span className="mb-3 mb-md-0 text-muted mt-3">© 2023 Kifel, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i
                className="bi bi-github"
                style={{fontSize: "20px" }}
              ></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i
                className="bi bi-instagram"
                style={{fontSize: "20px" }}
              ></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i
                className="bi bi-linkedin me-5"
                style={{fontSize: "20px" }}
              ></i>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Home;

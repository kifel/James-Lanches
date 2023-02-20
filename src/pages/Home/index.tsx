import Aos from "aos";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Product } from "../../@types/globalTypes";
import aboutImage from "../../assets/aboutImage.jpg";
import image2 from "../../assets/mainpage2.jpg";
import image3 from "../../assets/mainpage3.jpg";
import image from "../../assets/mainpageimage.jpg";
import FlatList from "../../components/FlatList";
import Footer from "../../components/Footer";
import api from "../../service/api";
import {
  AboutUsCol,
  AboutUsText,
  AboutUsTitle,
  Banner,
  ButtonProducts,
  CartText,
  Container,
  ImageAbout,
  SectionTittle,
  Tittle,
  TittleSpan
} from "./styles";

const Home: React.FC = () => {
  const about = useRef();
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
    Aos.init({ duration: 1000 });
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
              <Tittle>Crispy delicioso</Tittle>
              <CartText>Simplesmente o melhor Crispy da região.</CartText>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <Banner
              src={image3}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-block d-md-block">
              <Tittle>A Família adora</Tittle>
              <CartText>Sempre temos combos incríveis.</CartText>
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
        <div className="container text-center" data-aos="fade-right">
          <ButtonProducts className="btn mt-5 text-center" to="/products">
            Todos os produtos
          </ButtonProducts>
        </div>
        <div className="container mt-5 text-center" data-aos="fade-up">
          <div className="row">
            <div className="col-12 mt-5">
              <AboutUsTitle className="mt-5" inView={aboutUsInView}>
                Sobre Nós
              </AboutUsTitle>
            </div>
            <div
              className="row d-flex justify-content-center align-items-center"
              ref={aboutUsRef}
            >
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
                <ImageAbout src={aboutImage} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

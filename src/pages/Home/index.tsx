import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Product } from "../../@types/globalTypes";
import image2 from "../../assets/mainpage2.jpg";
import image3 from "../../assets/mainpage3.jpg";
import image from "../../assets/mainpageimage.jpg";
import FlatList from "../../components/FlatList";
import api from "../../service/api";
import {
  AboutUsTitle,
  Banner,
  ButtonProducts,
  CartText,
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
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <Banner
              src={image}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-none d-md-block">
              <Tittle>
                James Lanches - <TittleSpan>The flavor you deserve!</TittleSpan>
              </Tittle>
              <CartText>
                James Lanches offers delicious burgers, sides, and desserts. The
                ingredients are fresh and of quality, prepared to perfection.
              </CartText>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <Banner
              src={image2}
              className="d-block w-100"
              alt="home page image"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <Banner
              src={image3}
              className="d-block w-100"
              alt="home page image"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container-fluid mt-5">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          ref={sectionTittleRef}
        >
          <SectionTittle inView={sectionTittleInView} className="text-center">
            TRENDING PRODUCTS
          </SectionTittle>
          <FlatList data={data} />
        </div>
        <div className="container text-center">
          <ButtonProducts className="btn mt-5 text-center" to="/products">
            See all products
          </ButtonProducts>
        </div>
        <div className="container">
          <AboutUsTitle className="text-center" inView={aboutUsInView}>
            About Us
          </AboutUsTitle>
          <div
            className="row d-flex justify-content-center align-items-center mt-5"
            ref={aboutUsRef}
          >
            <div className="col-12 col-md-6 text-center mt-5">
              <p>
                James-Lanches is a snack bar that offers a wide variety of tasty
                and well-made snacks with fresh and selected ingredients. Our
                priority is to ensure the quality of our food at affordable
                prices, without compromising exceptional customer service. In
                addition, we offer a variety of options to cater to all tastes
                and dietary preferences. Come try our snacks and enjoy our cozy
                atmosphere with friends and family.
              </p>
            </div>
            <div className="col-12 col-md-6 text-center">
              <p>IMAGEM AQUI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

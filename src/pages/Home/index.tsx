import React from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import image from "../../assets/mainpageimage.jpg";
import { Banner, CartText, Container, SectionTittle, Tittle } from "./styles";

const Home: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.5, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: true // define se a detecção deve ser disparada apenas uma vez
  });
  const navigate = useNavigate();

  return (
    <>
      <Container className="card text-center">
        <Banner src={image} className="card-img" alt="..." />
        <div className="card-img-overlay">
          <div className="row">
            <div className="col-6">
              <Tittle className="card-title mt-5">
                James Lanches - O sabor que você merece!
              </Tittle>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CartText className="card-text mt-2">
                O James Lanches oferece hambúrgueres, acompanhamentos e
                sobremesas deliciosas. Os ingredientes são frescos e de
                qualidade, preparados com perfeição. O ambiente é acolhedor e
                amigável, proporcionando uma experiência gastronômica única.
              </CartText>
            </div>
          </div>
        </div>
      </Container>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <SectionTittle inView={inView} ref={ref} className="text-center">
            MAIS VENDIDOS
          </SectionTittle>
        </div>
      </div>
      
    </>
  );
};

export default Home;

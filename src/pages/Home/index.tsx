import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Product } from "../../@types/globalTypes";
import image from "../../assets/mainpageimage.jpg";
import FlatList from "../../components/FlatList";
import api from "../../service/api";
import {
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
  const navigate = useNavigate();
  const [sectionTittleRef, sectionTittleInView] = useInView({
    threshold: 0.2, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: false, // define se a detecção deve ser disparada apenas uma vez
  });
  const [buttonProductsRef, buttonProductsInView] = useInView({
    threshold: 0.1, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: false, // define se a detecção deve ser disparada apenas uma vez
  });

  useEffect(() => {
    api.get("/products/search?isActive=true&page=0&size=3").then((response) => {
      setData(response.data.content);
    });
  }, []);

  return (
    <>
      <Container className="card text-center">
        <Banner src={image} className="card-img" alt="home page image" />
        <div className="card-img-overlay">
          <div className="row">
            <div className="col-6">
              <Tittle className="card-title mt-5">
                James Lanches -{" "}
                <TittleSpan>O sabor que você merece!</TittleSpan>
              </Tittle>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CartText className="card-text mt-2">
                O James Lanches oferece hambúrgueres, acompanhamentos e
                sobremesas deliciosas. Os ingredientes são frescos e de
                qualidade, preparados com perfeição.
              </CartText>
            </div>
          </div>
        </div>
      </Container>
      <div className="container-fluid mt-5">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          ref={sectionTittleRef}
        >
          <SectionTittle inView={sectionTittleInView}>
            MAIS VENDIDOS
          </SectionTittle>
          <FlatList data={data} />
        </div>
        <div className="container text-center">
          <ButtonProducts className="btn mt-4" to="/products">
            Veja todos os produtos
          </ButtonProducts>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center mt-5">
            <h1>Sobre Nós</h1>
            <div className="col-12 col-md-6 text-center mt-5">
              <p>
                James-Lanches é uma lanchonete que oferece uma ampla variedade
                de lanches saborosos e bem-feitos com ingredientes frescos e
                selecionados. Nossa prioridade é garantir a qualidade dos nossos
                alimentos a preços acessíveis, sem comprometer o atendimento
                excepcional aos nossos clientes. Além disso, oferecemos uma
                variedade de opções para atender a todos os gostos e
                preferências alimentares. Venha experimentar nossos lanches e
                desfrutar de nossa atmosfera aconchegante com amigos e
                familiares.
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

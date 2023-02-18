import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Product } from "../../@types/globalTypes";
import image from "../../assets/mainpageimage.jpg";
import FlatList from "../../components/FlatList";
import api from "../../service/api";
import {
  Banner,
  CartText,
  Container,
  SectionTittle,
  Tittle,
  TittleSpan
} from "./styles";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [ref, inView] = useInView({
    threshold: 0.5, // define a porcentagem da altura do elemento que deve estar visível para disparar a detecção
    triggerOnce: true, // define se a detecção deve ser disparada apenas uma vez
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
        <div className="row d-flex justify-content-center align-items-center h-100">
          <SectionTittle inView={inView} ref={ref}>
            MAIS VENDIDOS
          </SectionTittle>
          <FlatList data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;

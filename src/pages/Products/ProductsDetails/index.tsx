import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../@types/globalTypes";
import Footer from "../../../components/Footer";
import { AccordionWrapper } from "../../../components/Skeleton/SkeletonProductCard/styles";
import { SkeletonProductDetails } from "../../../components/Skeleton/SkeletonProductDetails";
import api from "../../../service/api";
import { SkeletonLoader, StyledImage, StyledImagePlaceholder } from "./styled";

const faqData = [
  {
    question: "Como faço para comprar o produto?",
    answer:
      "Para comprar o produto, clique no botão 'Comprar' e siga as instruções de pagamento.",
  },
  {
    question: "Quais as formas de pagamento aceitas?",
    answer:
      "Aceitamos cartão de crédito, boleto bancário e pagamento por meio de carteiras digitais.",
  },
  {
    question: "Qual é o prazo de entrega?",
    answer:
      "O prazo de entrega varia de acordo com a sua localidade. Consulte o prazo estimado informando o seu CEP no momento da compra.",
  },
];

const ProductsDetails: React.FC = () => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [data, setData] = useState<Product | null>();
  const [erro, setErro] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setErro(err.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  if (isFetching) {
    // Show loading placeholder using Bootstrap spinner
    return <SkeletonProductDetails />;
  }

  if (erro) {
    // Show error page using Bootstrap alert
    return (
      <div
        className="alert alert-danger d-flex justify-content-center align-items-center vh-100"
        role="alert"
      >
        <h2>Error</h2>
        <p>{erro}</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }

    while (stars.length < 5) {
      stars.push(
        <i key={stars.length} className="bi bi-star text-warning"></i>
      );
    }

    return stars;
  };

  return (
    <>
      <section className="container py-5 mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-4">
            {isImageLoading ? (
              <StyledImagePlaceholder className="d-flex justify-content-center align-items-center img-placeholder">
                <SkeletonLoader className="img-fluid rounded" />
              </StyledImagePlaceholder>
            ) : null}
            <StyledImage
              src={data?.imageUrl}
              alt={data?.name}
              className={`img-fluid rounded ${isImageLoading ? "d-none" : ""}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              {renderStars(data?.rating || 0)}
            </div>
            <h1 className="mb-3">{data?.name}</h1>
            <p>{data?.description}</p>
            <strong>
              {data?.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <div className="mt-4">
              <p>Categoria: {data?.category.name}</p>
              <p>
                Disponibilidade: {data?.stock ? "Em Estoque" : "Indisponível"}
              </p>
            </div>
            <button className="btn btn-danger mt-4">Comprar</button>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <h2 className="mb-2">Perguntas Frequentes: </h2>
        <AccordionWrapper>
          <div className="accordion mt-2" id="faqAccordion">
            {faqData.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading-${index}-james`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq-${index}-james`}
                    aria-expanded="true"
                    aria-controls={`faq-${index}-james`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`faq-${index}-james`}
                  className="accordion-collapse collapse show"
                  aria-labelledby={`heading-${index}-james`}
                >
                  <div className="accordion-body">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionWrapper>
      </section>
      <Footer />
    </>
  );
};

export default ProductsDetails;

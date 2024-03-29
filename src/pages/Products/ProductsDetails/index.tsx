import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackToTop from "../../../components/BackToTop";
import Footer from "../../../components/Footer";
import { SkeletonProductDetails } from "../../../components/Skeleton/SkeletonProductDetails";
import { CartContext } from "../../../context/CartProvider";
import { IProduct } from "../../../context/CartProvider/types";
import useProductDetails from "../../../hooks/useProductDetails";
import {
  AccordionWrapper,
  BackIcon,
  SkeletonLoader,
  StyledImage,
  StyledImagePlaceholder,
} from "./styled";

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
  const { id } = useParams();
  const { data, isFetching, error } = useProductDetails(id);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  const handleAddToCart = () => {
    if (data) {
      const productToAdd: IProduct = {
        id: data.id,
        name: data.name,
        rating: data.rating,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        category: data.category,
      };

      addToCart(productToAdd);

      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 5000, // Auto-close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const handleAddToCartAndGoToCartPage = () => {
    if (data) {
      const productToAdd: IProduct = {
        id: data.id,
        name: data.name,
        rating: data.rating,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        category: data.category,
      };

      addToCart(productToAdd);

      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 5000, // Auto-close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      navigate("/cart");
    }
  };

  if (isFetching) {
    return <SkeletonProductDetails />;
  }

  if (error) {
    // Show error page using Bootstrap alert
    return (
      <div
        className="alert alert-danger d-flex flex-column justify-content-center align-items-center vh-100"
        role="alert"
      >
        <h2>Error</h2>
        <p>{error}</p>
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
      <section className="container py-5">
        <div className="row mb-5">
          <div className="col-6">
            <button className="btn" onClick={() => navigate(-1)}>
              <BackIcon className="bi bi-arrow-90deg-left"></BackIcon>
            </button>
          </div>
        </div>
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
            <button
              className="btn btn-danger mt-4 me-2"
              onClick={handleAddToCartAndGoToCartPage}
            >
              Comprar
            </button>
            <button className="btn btn-danger mt-4" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
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
      <BackToTop />
      <Footer />
    </>
  );
};

export default ProductsDetails;

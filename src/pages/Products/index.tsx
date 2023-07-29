import React from "react";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { SkeletonProductCard } from "../../components/Skeleton/SkeletonProductCard";
import useProductsData from "../../hooks/useProductsData";
import {
  ProductNotFound,
  SearchProductBox,
  SelectCategory,
  StyledPagination,
} from "./styles";

const Products: React.FC = () => {
  const {
    isFetching,
    data,
    category,
    erro,
    buscar,
    setBuscar,
    categoria,
    setCategoria,
    pagina,
    setSearchParams,
  } = useProductsData();

  const renderNotFound = () => {
    if (!isFetching && erro === "" && data && data.numberOfElements > 0) {
      return renderPagination();
    }
    return (
      <ProductNotFound className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center mt-5">
          <h1 className="mb-4 mt-5">Produto não encontrado</h1>
          <p className="lead">
            Pedimos desculpas, mas não conseguimos encontrar o produto que você
            estava procurando.
          </p>
        </div>
      </ProductNotFound>
    );
  };

  const renderPagination = () => {
    return (
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col d-flex justify-content-center">
            <StyledPagination
              count={data?.totalPages}
              page={pagina}
              onChange={(_, newPage) =>
                setSearchParams(
                  {
                    buscar,
                    categoria,
                    pagina: newPage.toString(),
                  },
                  { replace: true }
                )
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const renderLoadingScreen = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <SkeletonProductCard />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6 col-md-6">
            <SearchProductBox
              type="buscar"
              placeholder="Buscar"
              value={buscar}
              className="form-control"
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>
          <div className="col-6">
            <SelectCategory
              className="form-select"
              aria-label="Default select example"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {category?.map((cat) => (
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </SelectCategory>
          </div>
        </div>
        {isFetching ? (
          renderLoadingScreen()
        ) : (
          <ProductCard data={data?.content} />
        )}
        {isFetching ? "" : renderNotFound()}
      </div>
      <BackToTop />
      <Footer />
    </>
  );
};

export default Products;

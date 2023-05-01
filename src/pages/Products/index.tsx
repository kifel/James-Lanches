import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryProduct, PageableProduct } from "../../@types/globalTypes";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useDebounce } from "../../hooks/useDebounce";
import api from "../../service/api";
import { SearchProductBox, SelectCategory, StyledPagination } from "./styles";

const Products: React.FC = () => {
  const { debounce } = useDebounce(300, true);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [data, setData] = useState<PageableProduct | null>();
  const [category, setCategory] = useState<CategoryProduct[]>();
  const [erro, setErro] = useState<string>("");

  const categoria = useMemo(() => {
    return searchParams.get("categoria") || "";
  }, [searchParams]);

  const buscar = useMemo(() => {
    return searchParams.get("buscar") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    const atualPage = Number(searchParams.get("pagina") || "1");
    setPage(atualPage - 1);
    return atualPage;
  }, [searchParams]);

  useEffect(() => {
    api.get("/category").then((response) => {
      setCategory(response.data);
    });
  }, []);

  useEffect(() => {
    debounce(() => {
      setData(null);
      setIsFetching(true);
      setErro("");
      if (buscar === "" && categoria === "") {
        api
          .get(`/products/search?isActive=true&page=${page}&size=10`)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setErro(err.data);
          })
          .finally(() => {
            setIsFetching(false);
          });
      }

      if (buscar === "" && categoria !== "") {
        api
          .get(
            `/products/search?categoryName=${categoria}&isActive=true&page=${page}&size=10`
          )
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setErro(err.data);
          })
          .finally(() => {
            setIsFetching(false);
          });
      }

      if (categoria === "" && buscar !== "") {
        api
          .get(
            `/products/search?name=${buscar}&isActive=true&page=${page}&size=10`
          )
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setErro(err.data);
          })
          .finally(() => {
            setIsFetching(false);
          });
      }

      if (buscar && categoria !== "") {
        api
          .get(
            `/products/search?name=${buscar}&categoryName=${categoria}&isActive=true&page=${page}&size=10`
          )
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          })
          .catch((err) => {
            setErro(err.data);
          })
          .finally(() => {
            setIsFetching(false);
          });
      }
    });
  }, [buscar, page, categoria]);

  const renderNotFound = () => {
    if (!isFetching && erro === "" && data && data.numberOfElements > 0) {
      return renderPagination();
    }
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center mt-5">
          <h1 className="mb-4 mt-5">Product Not Found</h1>
          <p className="lead">
            We're sorry, but we couldn't find the product you were looking for.
          </p>
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col d-flex justify-content-center mt-5">
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
              onChange={(e) =>
                setSearchParams(
                  { buscar: e.target.value, categoria },
                  { replace: true }
                )
              }
            />
          </div>
          <div className="col-6">
            <SelectCategory
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                setSearchParams(
                  { categoria: e.target.value, buscar },
                  { replace: true }
                )
              }
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
        {isFetching ? "Loading..." : <ProductCard data={data?.content} />}
        {isFetching ? "" : renderNotFound()}
      </div>
      <BackToTop />
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Products;
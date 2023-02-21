import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageableProduct } from "../../@types/globalTypes";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useDebounce } from "../../hooks/useDebounce";
import api from "../../service/api";
import { StyledPagination } from "./styles";

const Products: React.FC = () => {
  const { debounce } = useDebounce(300, true);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [data, setData] = useState<PageableProduct>();
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
    debounce(() => {
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

  function renderPagination() {
    if (!isFetching && erro === "" && data && data.numberOfElements > 0) {
      return (
        <div className="container">
          <div className="row">
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
    }
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-md-3">
            <p>CATEGORIAS AQUI</p>
          </div>
          <div className="col-12 col-md-9">
            <div className="container-fluid">
              <input
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
              <div className="row">
                {isFetching ? (
                  "Loading..."
                ) : (
                  <ProductCard data={data?.content} />
                )}
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;

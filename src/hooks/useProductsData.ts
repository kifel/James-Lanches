import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryProduct, PageableProduct } from "../@types/globalTypes";
import api from "../service/api";
import { useDebounce } from "./useDebounce";

const useProductsData = () => {
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
    const getCategory = async () => {
      await api.get("/category").then((response) => {
        setCategory(response.data);
      });
    };
    getCategory();
  }, []);

  useEffect(() => {
    debounce(() => {
      setData(null);
      setIsFetching(true);
      setErro("");
      if (buscar === "" && categoria === "") {
        api
          .get(`/products/search?isActive=true&page=${page}&size=12`)
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
            `/products/search?categoryName=${categoria}&isActive=true&page=${page}&size=12`
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
            `/products/search?name=${buscar}&isActive=true&page=${page}&size=12`
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
            `/products/search?name=${buscar}&categoryName=${categoria}&isActive=true&page=${page}&size=12`
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
    });
  }, [buscar, page, categoria]);

  return {
    isFetching,
    data,
    category,
    erro,
    buscar,
    setBuscar: (value: string) =>
      setSearchParams({ buscar: value, categoria }, { replace: true }),
    categoria,
    setCategoria: (value: string) =>
      setSearchParams({ buscar, categoria: value }, { replace: true }),
    pagina,
    setSearchParams,
  };
};

export default useProductsData;

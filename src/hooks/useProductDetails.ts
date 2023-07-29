import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../@types/globalTypes";
import api from "../service/api";

interface ProductDetailsHook {
  data: Product | null;
  isFetching: boolean;
  error: string;
}

const useProductDetails = (id: string | undefined): ProductDetailsHook => {
  const [data, setData] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError("Error fetching product data.");
        toast.error("Error fetching product data. Please try again later.");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [id]);

  return { data, isFetching, error };
};

export default useProductDetails;

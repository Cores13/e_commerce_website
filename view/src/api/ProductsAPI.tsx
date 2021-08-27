import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

export default function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPAge] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 10
        }&${category}&${sort}&title[regex]=${search}`
      );
      setResult(res.data.result);
      setProducts(res.data.products);
    };
    getProducts();
  }, [callback, category, sort, page, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPAge],
    result: [result, setResult],
  };
}

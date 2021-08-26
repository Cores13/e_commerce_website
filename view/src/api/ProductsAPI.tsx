import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

export default function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    };
    getProducts();
  }, [callback]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
  };
}

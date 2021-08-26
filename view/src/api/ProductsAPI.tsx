import { useState } from "react";

export default function ProductsAPI() {
  const [products, setProducts] = useState([]);

  return {
    products: [products, setProducts],
  };
}

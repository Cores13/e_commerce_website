import axios from "axios";
import { useState, useEffect } from "react";

export default function CategoriesAPI(token: any) {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category", {
        headers: { Authorization: token },
      });
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

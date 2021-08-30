import React, { useContext, useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { ProductItem } from "../../components/productItem/ProductItem";
import axios from "axios";

export const Landing: React.FC = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [callback, setCallback] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPAge] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${page * 5}&&sort=-sold&title[regex]=`
      );
      setResult(res.data.result);
      setProducts(res.data.products);
    };
    getProducts();
  }, [callback, category, sort, page, search]);

  return (
    <div className='landing'>
      <div className='landingWrapper'>
        {/* Home */}
        <div className='landingTitleSection'>
          <div className='landingTitleSectionLeft'>
            <h1 className='landingTitle'>
              Većina planete prekrivena je vodom. Posao ribara je jednostavan:
              odabrati najbolje dijelove!
            </h1>

            <Link to='/products' className='landingTitleLink'>
              &#x2794; Kupi sada
            </Link>
          </div>
          <div className='landingTitleSectionRight'></div>
        </div>
        {/* Categories */}
        <div className='landingCategories'>
          <div className='landingCategoriesWrapper'>
            <div className='landingCategoriesCards'>
              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=60fff54422d16d1ef7943dd5")
                }>
                <div className='landingCategoriesCard Reel'>
                  <div className='landingCategoriesCardTitle'>MASINICE</div>
                </div>
              </Link>

              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=6124f8f3c18cad4c266c3989")
                }>
                <div className='landingCategoriesCard Rod'>STAPOVI</div>
              </Link>
              <Link
                to='/products'
                onClick={() =>
                  setCategory("category=612c8cd251269608539f7048")
                }>
                <div className='landingCategoriesCard Bait'>VARALICE</div>
              </Link>
            </div>
          </div>
        </div>
        {/* MOST SOLD ITEMS */}
        <div className='landingMostSold'>
          <div className='landingMostSoldWrapper'>
            <h2 className='landingMostSoldTitle'>NAJPRODAVANIJI PROIZVODI</h2>
            <div className='landingMostSoldProduct'>
              {products.map((product: any) => {
                return <ProductItem key={product._id} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

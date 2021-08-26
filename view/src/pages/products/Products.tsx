import React, { useContext, useState } from "react";
import "./Products.css";
import { GlobalState } from "../../GlobalState";
import { ProductItem } from "../../components/productItem/ProductItem";
import { Loading } from "../../components/loading/Loading";
import axios from "axios";

export interface IState {
  product: {
    category: string;
    checked: boolean;
    content: string;
    createdAt: any;
    description: string;
    images: {
      public_id: string;
      url: string;
    };
    price: number;
    product_id: string;
    sold: number;
    title: string;
    updatedAt: any;
    __v: any;
    _id: number;
  };
  isAdmin: boolean;
}

export const Products: React.FC = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state?.productsAPI.products;
  const [selectAll, setSelectAll] = useState(false);
  const [isAdmin] = state?.userAPI?.isAdmin;
  const [callback, setCallback] = state?.productsAPI.callback;
  const [token] = state?.token;
  const [categories] = state?.categoriesAPI?.categories;
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPAge] = useState(1);
  const [result, setResult] = useState(0);

  const checkAll = () => {
    products.forEach((product: any) => {
      product.checked = !selectAll;
    });
    setProducts([...products]);
    setSelectAll(!selectAll);
  };

  const deleteAll = async () => {
    products.forEach((product: any) => {
      if (!isAdmin) {
        return alert("Niste admin!");
      }
      if (product.checked) {
        axios.post(
          "/api/destroy",
          { public_id: product.images.public_id },
          { headers: { Authorization: token } }
        );
        axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: token },
        });
      }
    });
    setCallback(!callback);
  };

  if (products.length === 0) return <Loading />;
  return (
    <>
      {/* {products.length === 0 && <Loading />} */}
      <div className='productsWrapper'>
        <div className='productsSideMenu'>
          {isAdmin ? (
            <>
              <span
                onClick={checkAll}
                className='productsMenuSelectAll navLink'>
                OZNACI SVE{" "}
                <input
                  type='checkbox'
                  checked={selectAll}
                  className='productsSelectAllCheckbox'
                />
              </span>
              <span
                className='productsMenuDeleteAll navLink'
                onClick={deleteAll}>
                IZBRISI OZNACENO
              </span>{" "}
            </>
          ) : null}
          <div className='productsFilterMenu'>
            <div className='productsFilter'>
              <span className='productFilterCategory'>Kategorija</span>
              <select
                name='category'
                id='category'
                className='productFilterCategorySelect'>
                <option value=''>Izaberite kategoriju</option>
                {categories.map((category: any) => {
                  return (
                    <option value={`${category._id}`} key={`${category._id}`}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className='products'>
          {products.map((product: IState["product"]) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

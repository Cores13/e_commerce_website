import React, { useContext, useState } from "react";
import "./Products.css";
import { GlobalState } from "../../GlobalState";
import { ProductItem } from "../../components/productItem/ProductItem";
import { Loading } from "../../components/loading/Loading";
import { LoadMore } from "../../components/loadMore/LoadMore";
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
  // eslint-disable-next-line
  const [category, setCategory] = state?.productsAPI?.category;
  const [sort, setSort] = state?.productsAPI?.sort;
  const [search, setSearch] = state?.productsAPI?.search;

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

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  return (
    <>
      {/* SIDEMENU */}
      <div className='productsWrapper'>
        <div className='productsSideMenu'>
          {isAdmin ? (
            <div className='productsAdminMenu'>
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
            </div>
          ) : null}
          <div className='productsFilterMenu'>
            <div className='productsFilter'>
              <span className='productFilterCategory'>Kategorija:</span>
              <select
                name='category'
                id='category'
                className='productFilterCategorySelect'
                onChange={handleCategory}>
                <option value=''>Svi proizvodi</option>
                {categories.map((category: any) => {
                  return (
                    <option
                      value={`category=${category._id}`}
                      key={`${category._id}`}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='productsFilter'>
              <span className='productFilterSearch'>Pretraga:</span>
              <input
                type='text'
                value={search}
                placeholder='Naziv proizvoda'
                className='productFilterSearchInput'
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>
            <div className='productsFilter'>
              <span className='productFilterSort'>Sortiraj:</span>
              <select
                name='sort'
                id='sort'
                className='productFilterSortSelect'
                value={sort}
                onChange={(e) => setSort(e.target.value)}>
                <option value=''>Najnoviji</option>
                <option value='sort=oldest'>Najstariji</option>
                <option value='sort=-sold'>Najprodavaniji</option>
                <option value='sort=price'>Najniza cijena</option>
                <option value='sort=-price'>Najvisa cijena</option>
              </select>
            </div>
          </div>
          <LoadMore />
        </div>
        {/* PRODUCTS */}
        <div className='products'>
          {products.length === 0 && <Loading />}
          {products.map((product: IState["product"]) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./CreateProduct.css";
import { Loading } from "../../components/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
};

export const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state?.categoriesAPI?.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className='createProduct'>
      <div className='createProductWrapper'>
        <div className='upload'>
          <label htmlFor='file' className='createProductImgLabel'>
            Fotografija:
          </label>
          <input
            type='file'
            name='file'
            id='file_up'
            className='createProductFileUpload'
          />
          <div
            className='createProductImgDiv'
            id='file_img'
            style={styleUpload}>
            <img src='' alt='' className='createProductImg' />
            <span>X</span>
          </div>
        </div>

        <form className='createProductForm'>
          <div className='createProductFormRow'>
            <label htmlFor='product_id'>ID Proizvoda:</label>
            <input
              type='text'
              name='product_id'
              id='product_id'
              required
              value={product.product_id}
            />
          </div>
          <div className='createProductFormRow'>
            <label htmlFor='title'>Naziv:</label>
            <input
              type='text'
              name='title'
              id='title'
              required
              value={product.title}
            />
          </div>
          <div className='createProductFormRow'>
            <label htmlFor='price'>Cijena:</label>
            <input
              type='number'
              name='price'
              id='price'
              required
              value={product.price}
            />
          </div>
          <div className='createProductFormRow'>
            <label htmlFor='description'>Opis:</label>
            <textarea
              name='description'
              id='description'
              rows={5}
              required
              value={product.description}
            />
          </div>
          <div className='createProductFormRow'>
            <label htmlFor='content'>Karakteristike:</label>
            <textarea
              name='content'
              id='content'
              rows={7}
              required
              value={product.content}
            />
          </div>
          <div className='createProductFormRow'>
            <label htmlFor='categories'>Kategorija:</label>
            <select name='categories' id='categories' value={product.category}>
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
          <button className='createProductBtn' type='submit'>
            Kreiraj
          </button>
        </form>
      </div>
    </div>
  );
};

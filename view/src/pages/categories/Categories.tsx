import React, { useContext, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { GlobalState } from "../../GlobalState";
import CategoriesAPI from "../../api/CategoriesAPI";

interface Props {}

export const Categories = (props: Props) => {
  const state = useContext(GlobalState);
  const [token] = state?.token;
  const [categories, setCategories] = state?.categoriesAPI?.categories;
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state?.categoriesAPI?.callback;

  const createCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "/api/category",
        { name: category },
        { headers: { Authorization: token } }
      );
      setCategory("");
      setCallback(!callback);
      alert(res.data);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className='categories'>
      <div className='categoriesWrapper'>
        <form onSubmit={createCategory}>
          <label htmlFor='category'>Naziv kategorije:</label>
          <input
            type='text'
            name='category'
            placeholder='Kategorija'
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type='submit'>Sacuvaj</button>
        </form>
        <div className='categoriesCol'>
          {categories.map((category: any) => {
            return (
              <div className='categoriesRow' key={category._id}>
                <p>{category.name}</p>
                <div className='categoriesRowButtons'>
                  <button className='categoriesEditBtn'>Uredi</button>
                  <button className='categoriesDeleteBtn'>Izbrisi</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

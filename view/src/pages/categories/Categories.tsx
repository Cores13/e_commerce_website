import React, { useContext, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { GlobalState } from "../../GlobalState";

interface Props {}

export const Categories = (props: Props) => {
  const state = useContext(GlobalState);
  const [token] = state?.token;
  const [categories] = state?.categoriesAPI?.categories;
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state?.categoriesAPI?.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `http://localhost:8800/api/category/${id}`,
          { name: category },
          { headers: { Authorization: token } }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "http://localhost:8800/api/category",
          { name: category },
          { headers: { Authorization: token } }
        );

        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const editCategory = async (id: any, name: any) => {
    try {
      setID(id);
      setCategory(name);
      setOnEdit(true);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const deleteCategory = async (id: any) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `http://localhost:8800/api/category/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      alert(res.data.msg);
      setCallback(!callback);
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

          <button type='submit'>
            {onEdit ? "Sacuvaj izmjene" : "Sacuvaj"}
          </button>
        </form>
        <div className='categoriesCol'>
          {categories.map((category: any) => {
            return (
              <div className='categoriesRow' key={category._id}>
                <p>{category.name}</p>
                <div className='categoriesRowButtons'>
                  <button
                    className='categoriesEditBtn'
                    onClick={() => editCategory(category._id, category.name)}>
                    Uredi
                  </button>
                  <button
                    className='categoriesDeleteBtn'
                    onClick={() => deleteCategory(category._id)}>
                    Izbrisi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

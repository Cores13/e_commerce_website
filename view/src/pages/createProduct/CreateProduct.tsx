import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./CreateProduct.css";
import { ImageLoading } from "../../components/loading/ImageLoading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
};

type IType = {
  image: {
    public_id: string;
    url: string;
  } | null;
};

export const CreateProduct: React.FC = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state?.categoriesAPI?.categories;
  const [images, setImages] = useState(false);
  const [image, setImage] = useState<IType["image"]>({
    url: "",
    public_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state?.userAPI?.isAdmin;
  const [token] = state?.token;

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Niste admin!");
      }
      const file = e.target.files[0];
      if (!file) {
        return alert("Fotografija koju ste odabrali ne postoji.");
      }
      if (file.size > 1024 * 1024) {
        return alert("Fotografija koju ste odabrali je prevelika.");
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        return alert("Neispravan format fotografije.");
      }
      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setImage(res.data);
      setImages(true);
      setLoading(false);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) {
        return alert("Niste admin!");
      }
      await axios.post(
        "/api/destroy",
        { public_id: image?.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setImages(false);
      setImage(null);
      setLoading(false);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();

    try {
      const { name, value } = e.currentTarget;
      setProduct({ ...product, [name]: value });
      console.log(product);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isAdmin) {
        return alert("Niste admin!");
      }
      if (!image) {
        return alert("Niste odabrali fotografiju!");
      }
      await axios.post(
        "/api/products",
        { ...product, images: image },
        {
          headers: { Authorization: token },
        }
      );

      setProduct(initialState);
      setImages(false);
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className='createProduct'>
      <div className='createProductWrapper'>
        <div className='createProductTop'>
          <h1 className='createProductTitle'>Kreiraj proizvod</h1>
        </div>
        <div className='createProductBot'>
          <div className='upload'>
            <label htmlFor='file' className='createProductImgLabel'>
              Fotografija:
            </label>
            <input
              type='file'
              name='file'
              id='file_up'
              className='createProductFileUpload'
              onChange={(e) => handleUpload(e)}
            />
            {loading ? (
              <div className='createProductImgDiv' id='file_img'>
                <ImageLoading />
              </div>
            ) : (
              <div
                className='createProductImgDiv'
                id='file_img'
                style={styleUpload}>
                <img
                  src={images ? `${image?.url}` : ""}
                  alt=''
                  className='createProductImg'
                />
                <span onClick={handleDestroy}>X</span>
              </div>
            )}
          </div>

          <form className='createProductForm' onSubmit={handleSubmit}>
            <div className='createProductFormRow'>
              <label htmlFor='product_id'>ID Proizvoda:</label>
              <input
                type='text'
                name='product_id'
                id='product_id'
                required
                value={product.product_id}
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
              />
            </div>
            <div className='createProductFormRow'>
              <label htmlFor='categories'>Kategorija:</label>
              <select
                name='category'
                id='category'
                value={product.category}
                onChange={handleChangeInput}>
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
    </div>
  );
};

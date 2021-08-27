import React, { useContext } from "react";
import "./ProductItem.css";
import { IState as IProduct } from "../../pages/products/Products";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
interface Props {
  product: IProduct["product"];
  // setProducts: React.Dispatch<React.SetStateAction<IProduct["product"]>>;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const state = useContext(GlobalState);
  const addCart: any = state?.userAPI?.addCart;
  const [isAdmin] = state?.userAPI?.isAdmin;
  const [callback, setCallback] = state?.productsAPI.callback;
  const [token] = state?.token;
  const [products, setProducts] = state?.productsAPI.products;

  const deleteProduct = async () => {
    try {
      if (!isAdmin) {
        return alert("Niste admin!");
      }
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id: product.images.public_id },
        { headers: { Authorization: token } }
      );
      const destroyProduct = axios.delete(`/api/products/${product._id}`, {
        headers: { Authorization: token },
      });
      await destroyImg;
      await destroyProduct;
      alert("Proizvod uspjesno izbrisan.");
      setCallback(!callback);
    } catch (error) {}
  };

  const handleCheck = (id: any) => {
    products.forEach((product: any) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };

  return (
    <div className='productItem'>
      {isAdmin && (
        <input
          type='checkbox'
          checked={product.checked}
          className='productItemCheckbox'
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt='Product' className='productImg' />
      <div className='productItemBody'>
        <div className='productItemBodyTop'>
          <h2 className='productItemTitle'>{product.title}</h2>
          <p className='productItemDescription'>{product.description}</p>
        </div>
        <div className='productItemBodyBottom'>
          <p className='productItemPrice'>
            <span className='productItemPriceTitle'>Cijena:</span>{" "}
            {product.price}KM
          </p>
          <div className='buttons'>
            {isAdmin ? (
              <>
                <Link id='buyBtn' to={`/edit_product/${product._id}`}>
                  UREDI
                </Link>
                <Link id='detailsBtn' to='#!' onClick={deleteProduct}>
                  IZBRISI
                </Link>
              </>
            ) : (
              <>
                <Link id='buyBtn' to='#!' onClick={() => addCart(product)}>
                  KUPI
                </Link>
                <Link id='detailsBtn' to={`/detail/${product._id}`}>
                  DETALJNO
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

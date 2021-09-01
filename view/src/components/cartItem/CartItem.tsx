import React, { useContext } from "react";
import "./CartItem.css";
import { GlobalState } from "../../GlobalState";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

interface IProps {
  product: any;
}

export const CartItem: React.FC<IProps> = ({ product }) => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state?.userAPI?.cart;
  const [token] = state?.token;

  const addToCart = async (cart: any) => {
    await axios.put(
      "http://localhost:8800/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id: any) => {
    cart.forEach((item: any) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = (id: any) => {
    cart.forEach((item: any) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeItem = (id: any) => {
    if (window.confirm("Zelite li ukloniti ovaj artikal iz korpe?")) {
      cart.forEach((item: any, index: any) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart([]);
    }
  };

  return (
    <>
      <td>{product.title}</td>
      <td>
        <img src={product?.images?.url} alt='Artikal' className='cartItemImg' />
      </td>
      <td>{product.description}</td>
      <td className='cartItemQuantityButtons'>
        <button
          className='cartItemQuantityBtn minus'
          onClick={() => decrement(product._id)}>
          -
        </button>
        <span className='cartItemQuantityValue'>{product.quantity}</span>
        <button
          className='cartItemQuantityBtn plus'
          onClick={() => increment(product._id)}>
          +
        </button>
      </td>
      <td>{product.price * product.quantity} KM</td>
      <td>
        <button
          className='cartItemDeleteIcon'
          onClick={() => removeItem(product._id)}>
          <DeleteIcon />
        </button>
      </td>
    </>
  );
};

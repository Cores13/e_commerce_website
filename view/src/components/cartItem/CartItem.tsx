import React, { ReactElement } from "react";
import "./CartItem.css";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  product: any;
}

export const CartItem: React.FC<IProps> = ({ product }) => {
  console.log(product);
  return (
    <li className='cartItem'>
      <h4 className='cartItemTitle'>{product.title}</h4>
      <img src={product?.images?.url} alt='Artikal' className='cartItemImg' />
      <p className='cartItemDescription'>{product.description}</p>
      <div className='cartItemQuantity'>
        <button className='cartItemQuantityBtn'>-</button>
        <span className='cartItemQuantityValue'>{product.quantity}</span>
        <button className='cartItemQuantityBtn'>+</button>
      </div>
      <p className='cartItemPrice'>{product.price * product.quantity} KM</p>
      <button className='cartItemDeleteIcon'>
        <DeleteIcon />
      </button>
    </li>
  );
};

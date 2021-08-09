import React, { ReactElement } from "react";
import "./CartItem.css";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  product: any;
}

export const CartItem: React.FC<IProps> = ({ product }) => {
  return (
    <li className='cartItem'>
      <h4 className='cartItemTitle'>{product.title}</h4>
      <img src={product.images.url} alt='Artikal' className='cartItemImg' />
      <p className='cartItemDescription'>{product.description}</p>
      <input
        type='number'
        className='cartItemQuantity'
        value={product.quantity}
      />
      <p className='cartItemPrice'>{product.price} KM</p>
      <button className='cartItemDeleteIcon'>
        <DeleteIcon />
      </button>
    </li>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { CartItem } from "../../components/cartItem/CartItem";
import "./Cart.css";

interface Props {}

export const Cart: React.FC = ({}: Props) => {
  const state = useContext(GlobalState);
  const [cart] = state?.userAPI?.cart;

  console.log(cart);
  var total: number = 0;
  if (cart.length === 0) {
    return <h2>KORPA JE PRAZNA</h2>;
  }

  return (
    <>
      <div className='cartWrapper'>
        <div className='cart'>
          <div className='cartLeft'>
            <div className='cartLeftTop'>left top</div>
            <div className='cartLeftBottom'>
              <ol className='cartItemsList'>
                {cart.map((product: any) => {
                  return <CartItem key={product._id} product={product} />;
                })}
              </ol>
            </div>
          </div>
          <div className='cartRight'>
            <div className='cartRightTop'>Total:</div>
            <div className='cartRightBottom'>
              <p>
                {cart.map((item: any) => {
                  return (total +=
                    parseInt(item.price, 10) * parseInt(item.quantity, 10));
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

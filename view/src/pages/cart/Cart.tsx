import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { CartItem } from "../../components/cartItem/CartItem";
import "./Cart.css";

interface Props {}

export const Cart: React.FC = ({}: Props) => {
  const state = useContext(GlobalState);
  const [cart] = state?.userAPI?.cart;
  const [total, setTotal] = useState(0);

  console.log(cart);
  // var total: number = 0;
  if (cart.length === 0) {
    return <h2>KORPA JE PRAZNA</h2>;
  }

  return (
    <>
      <div className='cartWrapper'>
        <div className='cart'>
          <div className='cartLeft'>
            <div className='cartLeftTop'>
              <h4>Naziv proizvoda</h4>
              <h4>Slika</h4>
              <h4>Opis</h4>
              <h4>Količina</h4>
              <h4>Cijena</h4>
              <h4>Ukloni</h4>
            </div>
            <div className='cartLeftBottom'>
              <ol className='cartItemsList'>
                {cart.map((product: any) => {
                  return <CartItem key={product._id} product={product} />;
                })}
              </ol>
            </div>
          </div>
          <div className='cartRight'>
            <div className='cartRightTop'>Ukupno: {total}</div>
            <div className='cartRightBottom'>
              {/* <p>
                {cart.map((item: any) => {
                  return (total +=
                    parseInt(item.price, 10) * parseInt(item.quantity, 10));
                })}
              </p> */}
              <button className='cartPayment'>Zavrsi kupovinu</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

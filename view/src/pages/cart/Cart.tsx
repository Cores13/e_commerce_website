import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { CartItem } from "../../components/cartItem/CartItem";
import "./Cart.css";
import { PayPal } from "./PayPal";

export const Cart: React.FC = () => {
  const state = useContext(GlobalState);
  const [cart] = state?.userAPI?.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
      const total = cart.reduce((prev: any, item: any) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  if (cart.length === 0) {
    return <h2 className='emptyCart'>KORPA JE PRAZNA</h2>;
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
              {/* <PayPalButton
                total={total}
                onSuccess={(payment: any) => tranSuccess(payment)}
                tranSuccess={tranSuccess}
              /> */}
              <PayPal />

              {/* <PayPal total={total} tranSuccess={tranSuccess} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

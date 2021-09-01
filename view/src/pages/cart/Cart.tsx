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
            <table>
              <thead>
                <tr>
                  <th>Naziv proizvoda</th>
                  <th>Slika</th>
                  <th>Opis</th>
                  <th>Količina</th>
                  <th>Cijena</th>
                  <th>Ukloni</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product: any) => {
                  return (
                    <tr
                      key={product._id}
                      className='cartItemBorder'
                      style={{ border: "1px solid lightgrey !important" }}>
                      <CartItem key={product._id} product={product} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='cartRight'>
            <div className='cartRightTop'>Ukupno: {total}KM</div>
            <div className='cartRightBottom'>
              <PayPal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

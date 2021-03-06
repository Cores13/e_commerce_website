import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { GlobalState } from "../../GlobalState";

import { PayPalButton } from "react-paypal-button-v2";

export const PayPal = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state?.userAPI?.cart;
  const [total, setTotal] = useState(0);
  const [token] = state?.token;

  useEffect(() => {
    const getTotal = async () => {
      const totalEur = await axios.get(
        `http://data.fixer.io/api/latest?access_key=6fdb3a7cdea6638c2d56268d2d89d15b&base=EUR&symbols=BAM`
      );
      const total = cart.reduce((prev: any, item: any) => {
        // return (prev + item.price * item.quantity) * 0.51;
        return (
          (prev + item.price * item.quantity) /
          totalEur.data.rates.BAM
        ).toFixed(2);
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const restartCart = async () => {
    cart.length = 0;
    setCart(cart);
    await axios
      .put(
        "http://localhost:8800/user/addcart",
        { cart },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        alert("Uspjesno ste zavrsili narudzbu.");
      });
  };

  const tranSuccess = async (data: any, details: any) => {
    const { id } = details;
    await axios
      .post(
        "http://localhost:8800/api/payment",
        { cart, id },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        restartCart();
        window.location.reload();
      });
  };

  return (
    <PayPalButton
      amount={total}
      currency='EUR'
      onSuccess={async (details: any, data: any) => {
        tranSuccess(data, details);
      }}
    />
  );
};

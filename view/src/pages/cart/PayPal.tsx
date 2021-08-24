import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { GlobalState } from "../../GlobalState";

import { PayPalButton } from "react-paypal-button-v2";

export const PayPal = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state?.userAPI?.cart;
  const [total, setTotal] = useState(0);
  const [token] = state?.token;
  console.log(token);

  useEffect(() => {
    const getTotal = async () => {
      const total = cart.reduce((prev: any, item: any) => {
        return prev + item.price * item.quantity;
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
      .finally(() => alert("Uspjesno ste zavrsili narudzbu."));
  };

  const tranSuccess = async (data: any, details: any) => {
    const { id } = details;
    const { address } = details.payer;
    console.log(token);

    await axios
      .post(
        "http://localhost:8800/api/payment",
        { cart, id, address },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        restartCart();
        window.location.reload();
      });
  };

  console.log(total);
  return (
    <PayPalButton
      amount={total}
      currency='EUR'
      onSuccess={async (details: any, data: any) => {
        console.log(data);
        console.log(details);
        tranSuccess(data, details);
      }}
    />
  );
};

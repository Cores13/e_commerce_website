import axios from "axios";
import { useState, useEffect } from "react";

type IState = {
  isLogged:
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
  isAdmin:
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
  cart:
    | (never[] | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (never[] | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
  history:
    | (never[] | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (never[] | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
  callback:
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
};

export default function UserAPI(token: any) {
  const [isLogged, setIsLogged] = useState<IState["isLogged"]>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<any>([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (error: any) {
          alert(error.res.data.msg);
        }
      };
      getUser();
    }
  }, [token, isAdmin]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin]);

  const addCart = async (product: any) => {
    if (!isLogged) return alert("Molimo prijavite se.");

    const check = cart.every((item: any) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.put(
        "http://localhost:8800/user/addcart",
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        { headers: { Authorization: token } }
      );
    } else {
      alert("Vec ste dodali ovaj artikal u korpu!");
    }
  };

  try {
    return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
      cart: [cart, setCart],
      addCart: addCart,
      history: [history, setHistory],
      callback: [callback, setCallback],
    };
  } catch (error) {
    alert(error);
  }
}

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
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
};

export default function UserAPI(token: any) {
  const [isLogged, setIsLogged] = useState<IState["isLogged"]>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (error: any) {
          alert(error.res.data.msg);
        }
      };
      getUser();
    }
  }, [token, isAdmin]);

  const addCart = async (product: any) => {
    if (!isLogged) return alert("Please log in first.");

    const check = cart.every((item: any) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      cart.map((item: any) => {
        if (item._id === product._id) {
          item.quantity += 1;
          console.log(item.quantity);
          console.log(cart);
        }
      });
    }
  };

  try {
    return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
      cart: [cart, setCart],
      addCart: addCart,
    };
  } catch (error) {
    alert(error);
  }
}

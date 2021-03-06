import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export interface ContextType {
  token: (boolean | React.Dispatch<React.SetStateAction<boolean>>)[] | any;
  productsAPI:
    | {
        products: (never[] | React.Dispatch<React.SetStateAction<never[]>>)[];
        callback:
          | (boolean | React.Dispatch<React.SetStateAction<boolean>>)
          | any;
        category: (string | React.Dispatch<React.SetStateAction<string>>)[];
        sort: (string | React.Dispatch<React.SetStateAction<string>>)[];
        search: (string | React.Dispatch<React.SetStateAction<string>>)[];
        page: (number | React.Dispatch<React.SetStateAction<number>>)[];
        result: (number | React.Dispatch<React.SetStateAction<number>>)[];
      }
    | any;
  userAPI:
    | {
        isLogged:
          | (boolean | React.Dispatch<React.SetStateAction<boolean>>)
          | any;
        isAdmin:
          | (boolean | React.Dispatch<React.SetStateAction<boolean>>)
          | any;
        cart: (boolean | React.Dispatch<React.SetStateAction<boolean>>) | any;
        addCart: any;
        history:
          | (never[] | React.Dispatch<React.SetStateAction<never[]>>)[]
          | any;
      }
    | undefined;
  categoriesAPI:
    | {
        categories:
          | (never[] | React.Dispatch<React.SetStateAction<never[]>>)[]
          | any;
        callback:
          | (boolean | React.Dispatch<React.SetStateAction<boolean>>)
          | any;
      }
    | undefined;
}

export const GlobalState = createContext<ContextType | undefined>(undefined);

export const DataProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 11 * 60 * 1000);
      };

      refreshToken();
    }
  }, []);

  ProductsAPI();
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

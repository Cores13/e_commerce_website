import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import ProductsAPI from './api/ProductsAPI';

interface ContextType {
    token: (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]; 
    productsAPI: { 
        products: (never[] | React.Dispatch<React.SetStateAction<never[]>>)[] ;
    } | any;
}

export const GlobalState = createContext<ContextType | undefined>(undefined);

export const DataProvider: React.FC = ({children}) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token');

        setToken(res.data.accesstoken);
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) refreshToken();
    }, [])

    ProductsAPI();
    const state = {
        token: [token ,setToken],
        productsAPI: ProductsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
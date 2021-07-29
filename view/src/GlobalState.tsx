import React, {createContext, useState} from 'react';
import ProductsAPI from './api/ProductsAPI';

interface ContextType {
    token: (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]; 
    productsAPI: { 
        products: (never[] | React.Dispatch<React.SetStateAction<never[]>>)[] ;
    } | any;
}

export const GlobalState = React.createContext<ContextType | undefined>(undefined);

export const DataProvider: React.FC = ({children}) => {
    const [token, setToken] = useState(false);

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
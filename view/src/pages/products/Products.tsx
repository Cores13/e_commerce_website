import React, { useState, useEffect, useContext } from 'react'
import {GlobalState} from '../../GlobalState'
import {ProductItem} from '../../components/productItem/ProductItem'


export interface Props {
    product: {
        category: string;
        checked: boolean;
        content: string;
        createdAt: any;
        description: string;
        images: {
            public_id: string; 
            url: string;}
        price: number;
        product_id: string;
        sold: number;
        title: string;
        updatedAt: any;
        __v: any;
        _id: number;
    }
}


export const Products: React.FC = () => {
    const state = useContext(GlobalState);
    const [products] = state?.productsAPI.products;

    useEffect(() => {
        const getProducts = async () => {
            const [products] = state?.productsAPI.products;
        }
        getProducts();
    }, [state, state?.productsAPI]);

    console.log(products);
    return (
        <div className="products">
            {products.map((product:Props['product']) => {
                return <ProductItem key={product._id} product={product} />;
            })}
        </div>
    )
}

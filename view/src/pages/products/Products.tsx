import React, { useContext } from 'react'
import './Products.css'
import {GlobalState} from '../../GlobalState'
import {ProductItem} from '../../components/productItem/ProductItem'


export interface IState {
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


    return (
        <div className="productsWrapper">
            <div className="products">
                {products.map((product:IState['product']) => {
                    return <ProductItem key={product._id} product={product} />;
                })}
            </div>
        </div>
    )
}

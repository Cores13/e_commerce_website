import React, { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import {IState as IProduct} from '../../pages/products/Products'
import './ProductDetail.css'

interface Props {
    id: any;
    detailProduct: IProduct['product'];
}

export const ProductDetail: React.FC = () => {
    const {id}:Props['id'] = useParams();
    const state= useContext(GlobalState);
    const [products] = state?.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState({});




    useEffect(() => {
        if(id){
            products.forEach((product:IProduct['product']) => {
                if(product._id === id){
                    setDetailProduct(product);
                }
            })
        }
    }, [id, products])
    console.log(detailProduct);

    const propOwn = Object.getOwnPropertyNames(detailProduct);

    if(propOwn.length === 0) return null;
    return (
        <div className="detailProductWrapper">
            <div className="detailProduct">
                <div className="detailProductLeft"></div>
                <div className="detailProductRight"></div>
            </div>
        </div>
    )
}
